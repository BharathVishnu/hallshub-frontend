import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { supabase } from '../pages/supabase';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/components/AuthContext';

export default function Booking() {
  

  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [eventName, setEventName] = useState('');
  const [eventCategory, setEventCategory] = useState('');
  const [expectedAttendees, setExpectedAttendees] = useState(0);
  const [fromDateTime, setFromDateTime] = useState('');
  const [toDateTime, setToDateTime] = useState('');
  const [venue, setVenue] = useState('');
  const [club,setClub] =useState('');
  const { username } = useAuth();
  const [venuesLoaded, setVenuesLoaded] = useState(false);
  const [availableVenues, setAvailableVenues] = useState([]);
  const [occupiedRooms, setOccupiedRooms] = useState([]);
  const [allvenues, setAllVenues] = useState([]);
  
  

  const handleBookEvent = async () => {
    try {
      if (!toDateTime || !fromDateTime || !expectedAttendees || !eventCategory || !eventName || !venue) {
        window.alert("Please enter all details");
        return;
      }
  
      // Check if there is an event at the same time
      const { data: conflictingEvents, error: conflictingEventsError } = await supabase
        .from('booking')
        .select()
        .eq('roomname', venue)
        .gte('startdate', fromDateTime)
        .lte('enddate', toDateTime);
  
      if (conflictingEventsError) {
        throw conflictingEventsError;
      }
  
      if (conflictingEvents.length > 0) {
        window.alert('Another event is already booked for the selected time at this venue. Please choose a different time.');
        return;
      }

      const { data: venueDetails, error: venueDetailsError } = await supabase
      .from('room')
      .select('capacity')
      .eq('roomname', venue);
    
    if (venueDetailsError) {
      throw venueDetailsError;
    }
    
    const venueCapacity = venueDetails[0]?.capacity;
    
    if (venueCapacity < expectedAttendees) {
      window.alert('Expected attendees exceed the capacity of the selected venue.');
      return;
    }
    
      // Insert the booking details into the database
      const { data, error } = await supabase
        .from('booking')
        .upsert([
          {
            eventname: eventName,
            eventcategory: eventCategory,
            startdate: fromDateTime,
            enddate: toDateTime,
            roomname: venue,
            username: username,
            club: club,
          }
        ]);
  
      console.log(data);
  
      if (error) {
        throw error;
      }
  
      // Update the Occupancy table
      await supabase
        .from('occupancy')
        .upsert([
          {
            roomname: venue,
            startdate: fromDateTime,
            enddate: toDateTime,
          },
        ]);
  
      // Handle successful booking, e.g., show a success message or redirect to a confirmation page
      window.alert('Event booked successfully');
      setEventName('');
      setEventCategory('');
      setExpectedAttendees('');
      setFromDateTime('');
      setToDateTime('');
      setVenue('');
    } catch (error) {
      window.alert('Error booking event. Please try again.');
      console.log(error);
    }
  };
  
  useEffect(() => {
      
    const fetchDataFromSupabase = async () => {
      try {
        const { data, error } = await supabase
          .from('room')
          .select('roomname'); // Select only the 'roomname' column
        if (error) {
          console.error('Error fetching data from Supabase:', error.message);
        } else {
          setUserData(data);
        }
      } catch (error) {
        console.error('Unexpected error:', error.message);
      } finally {
        setLoading(false); // Set loading to false whether fetching was successful or not
      }
    };
    const fetchClubFromSupabase = async () => {
      try {
        const { data, error } = await supabase
          .from('user')
          .select('club')
          .eq('username',username); // Select only the 'roomname' column
        if (error) {
          console.error('Error fetching data from Supabase:', error.message);
        } else {
          const userClub = data && data.length > 0 ? data[0].club : '';
          setClub(userClub);
        }
      } catch (error) {
        console.error('Unexpected error:', error.message);
      } finally {
        setLoading(false); // Set loading to false whether fetching was successful or not
      }
    };
    const fetchVenuesFromSupabase = async () => {
      try {
        const { data, error } = await supabase
          .from('room')
          .select('roomname') // Select only the 'roomname' column
        if (error) {
          console.error('Error fetching data from Supabase:', error.message);
        } else {
          const all = data ;
          setAllVenues(all);
        }
      } catch (error) {
        console.error('Unexpected error:', error.message);
      } finally {
        setLoading(false); // Set loading to false whether fetching was successful or not
      }
    };

    fetchVenuesFromSupabase();
    fetchDataFromSupabase();
    fetchClubFromSupabase();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior
    try {
      await handleBookEvent();
    } catch (error) {
      console.error('Error handling form submission:', error);
    }
  };


    return (
    <main >  
        <Sidebar/>
        <Navbar/>
        <form onSubmit={handleSubmit} data-aos="fade-right" className="font-mont relative rounded-l-3xl w-screen md:w-full flex flex-col items-center justify-center mx-auto mt-10 gap-2 mb-10 md:mb-0">
          {/* Event */}
          <div className="ml-5 mb-4 ">
            <label htmlFor="username" className="block text-lg md:text-xl font-bold text-white">
              event name 
            </label>
            <input
              type="text"
              id="eventname"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              className="mt-1 p-3 md:p-4 w-[270px] md:w-[700px] lg:w-[900px] md:p-4 opacity-[80%] bg-[#6B739D] border-blue-500 rounded-2xl focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          {/* Event Category */}
          <div className="ml-5 mb-4">
            <label htmlFor="category" className="block text-lg md:text-xl font-bold text-white">
              Event Category
            </label>
            <select
              id="category"
              value={eventCategory}
              onChange={(e) => setEventCategory(e.target.value)}
              className="mt-1 p-3 md:p-4 w-[270px] md:w-[700px] lg:w-[900px] opacity-[80%] bg-[#6B739D] border-blue-500 rounded-2xl focus:outline-none focus:ring focus:border-blue-300"
            >
              <option value=""></option>
              <option value="Technical">Technical</option>
              <option value="Hackathon">Hackathon</option>
              <option value="Workshop">Workshop</option>
              <option value="Cultural">Cultural</option>
              <option value="Sports">Sports</option>
            </select>
          </div>


          {/* Expected Attendees */}
          <div className="ml-5 mb-4">
            <label htmlFor="username" className="block text-lg md:text-xl font-bold text-white">
              expected attendees
            </label>
            <input
              type="integer"
              id="attendees"
              value={expectedAttendees}
              onChange={(e) => setExpectedAttendees(e.target.value)}
              className="mt-1 p-3 md:p-4 w-[270px] md:w-[700px] lg:w-[900px]  opacity-[80%] bg-[#6B739D] border-blue-500 rounded-2xl focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          
          <div className="flex flex-row justify-between items-center ml-3 md:ml-0 gap-5 md:gap-2">
            {/* From */}
            <div className="md:ml-5 mb-4">
              <label htmlFor="password" className="block text-lg md:text-xl font-bold text-white">
                from
              </label>
              <input
                type="datetime-local"
                id="from"
                value={fromDateTime}
                onChange={(e) => setFromDateTime(e.target.value)}
                className="mt-1 p-3 md:p-4  w-[120px] md:w-[320px] lg:w-[400px] opacity-[80%] bg-[#6B739D] border-blue-500 rounded-2xl focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            {/* To */}
            <div className="md:ml-12 mb-4">
              <label htmlFor="password" className="block text-lg md:text-xl font-bold text-white">
                to
              </label>
              <input
                type="datetime-local"
                id="to"
                value={toDateTime}
                onChange={(e) => setToDateTime(e.target.value)}
                className="mt-1 p-3 md:p-4 w-[120px] md:w-[350px] lg:w-[450px] opacity-[80%] bg-[#6B739D] border-blue-500 rounded-2xl focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
          </div>


          {/* Venue*/}
          <div className="ml-5 mb-4">
              <label htmlFor="password" className="block text-lg md:text-xl font-bold text-white">
                venue
              </label>
              <select
                id="venue"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                // onClick={handleDropdownClick}
                className="mt-1 p-3 md:p-4 w-[270px] md:w-[700px] lg:w-[900px]  opacity-[80%] bg-[#6B739D] border-blue-500 rounded-2xl focus:outline-none focus:ring focus:border-blue-300"
              >
                  <option value=""></option>
                  {allvenues.map((room, index) => {
      const isOccupied = occupiedRooms.includes(room.roomname);
      return !isOccupied ? (
        <option key={index} value={room.roomname}>
          {room.roomname}
        </option>
                  ) : null;
                })} 
              </select>
            </div>

          {/* Book Button */}
          <button onClick={handleBookEvent} className="md:absolute md:left-48 md:top-[100%] mt-5 ml-7 md:ml-32 md:w-[170px] text-md text-center bg-[#6B739D] text-white rounded-full py-3 px-8 shadow-md hover:shadow-2xl hover:shadow-black hover:bg-white hover:text-black transition duration-500 relative overflow-hidden">
            <span className="absolute inset-0 bg-gradient-to-r from-white to-white opacity-20 animate-pulse"></span>
            <span className="relative z-10">Book</span>
          </button>

    </form>
    </main>
  )
}























// const fetchAvailableVenues = async () => {
  //   try {
  //     console.log('Fetching available venues...');
  
  //     const { data: occupiedRooms, error: occupiedRoomsError } = await supabase
  //       .from('occupancy')
  //       .select('roomname')
  //       .gte('startdate', fromDateTime)
  //       .lte('enddate', toDateTime);
  
  //     console.log('Occupied Rooms:', occupiedRooms);
  
  //     if (occupiedRoomsError) {
  //       throw occupiedRoomsError;
  //     }
  
  //     const occupiedRoomNames = (occupiedRooms || []).map((room) => room.roomname);
  
  //     let availableRoomsQuery = supabase.from('room').select('roomname, capacity');
  
  //     // Check if occupiedRoomNames is not empty, then exclude those rooms
  //     if (occupiedRoomNames.length > 0) {
  //       availableRoomsQuery = availableRoomsQuery.not('roomname', 'in', occupiedRoomNames);
  //     }
  
  //     // Add a filter for capacity
  //     availableRoomsQuery = availableRoomsQuery.gte('capacity', expectedAttendees);
  
  //     const { data: availableRooms, error: availableRoomsError } = await availableRoomsQuery;
  
  //     console.log('Available Rooms:', availableRooms);
  
  //     if (availableRoomsError) {
  //       windows.alert(availableRoomsError);
  //     }
  
  //     setAvailableVenues(availableRooms || []);
  //     setOccupiedRooms(occupiedRoomNames);
  //     setVenuesLoaded(true);
  //   } catch (error) {
  //     console.error('Error fetching available venues:', error);
  //     window.alert('Error fetching available venues');
  //     setAvailableVenues([]);
  //     setOccupiedRooms([]);
  //   }
  // };
  



    // const handleDropdownClick = () => {
  //   if (!venuesLoaded) {
  //     fetchAvailableVenues();
  //   }
  // };
