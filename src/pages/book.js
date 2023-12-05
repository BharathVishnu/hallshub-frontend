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
  const [expectedAttendees, setExpectedAttendees] = useState('');
  const [fromDateTime, setFromDateTime] = useState('');
  const [toDateTime, setToDateTime] = useState('');
  const [venue, setVenue] = useState('');
  const [club,setClub] =useState('');
  const [availablevenues,setAvailableVenues] =useState([]);
  const { username } = useAuth();

  const handleBookEvent = async () => {
    try {
      if (!toDateTime || !fromDateTime || !expectedAttendees || !eventCategory || !eventName || !venue) {
        window.alert("Please enter all details");
        return;
      }
      console.log(username);
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
            club:club,
          }
        ]);
      console.log(data)
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
      // Fetch available venues based on capacity and availability
  //     const fetchAvailableVenues = async () => {
  //       try {
  //         const occupiedRooms = await supabase
  //           .from('occupancy')
  //           .select('roomname')
  //           .lte('enddate', fromDateTime)
  //           .gte('startdate', toDateTime);
  
  //         if (occupiedRooms.error) {
  //           throw occupiedRooms.error;
  //         }
  
  //         const occupiedRoomNames = (occupiedRooms.data || []).map((room) => room.roomname);
  
  //         const { data, error } = await supabase
  //           .from('room')
  //           .select('roomname, capacity')
  //           .not('roomname', 'in', occupiedRoomNames)
  //           .gte('capacity', expectedAttendees);
  
  //         if (error) {
  //           throw error;
  //         }
  
  //         setAvailableVenues(data || []);
  //       } catch (error) {
  //         window.alert('Error fetching available venues');
  //         setAvailableVenues([]);
  //       }
  //   }
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
        <form onSubmit={handleSubmit} data-aos="fade-right" className="font-mont relative rounded-l-3xl w-full md:w-[1321px] flex flex-col items-center justify-center mx-auto mt-10 gap-2 mb-10 md:mb-0">
          {/* Event */}
          <div className="ml-5 mb-4">
            <label htmlFor="username" className="block text-lg md:text-xl font-bold text-white">
              event name 
            </label>
            <input
              type="text"
              id="eventname"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              className="mt-1 p-2 w-full md:w-[900px] opacity-[80%] bg-[#6B739D] border-blue-500 rounded-2xl focus:outline-none focus:ring focus:border-blue-300"
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
              className="mt-1 p-3 w-[220px]  md:w-[900px] opacity-[80%] bg-[#6B739D] border-blue-500 rounded-2xl focus:outline-none focus:ring focus:border-blue-300"
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
              type="text"
              id="attendees"
              value={expectedAttendees}
              onChange={(e) => setExpectedAttendees(e.target.value)}
              className="mt-1 p-2 w-full md:w-[900px] opacity-[80%] bg-[#6B739D] border-blue-500 rounded-2xl focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          
          <div className="flex flex-row justify-between items-center ml-3 md:ml-0 gap-5 md:gap-36">
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
                className="mt-1 p-2 w-[100px] md:w-[350px] opacity-[80%] bg-[#6B739D] border-blue-500 rounded-2xl focus:outline-none focus:ring focus:border-blue-300"
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
                className="mt-1 p-2 w-[100px] md:w-[350px] opacity-[80%] bg-[#6B739D] border-blue-500 rounded-2xl focus:outline-none focus:ring focus:border-blue-300"
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
                className="mt-1 p-3 w-[220px] md:w-[900px] opacity-[60%] bg-[#6B739D] border-blue-500 rounded-2xl focus:outline-none focus:ring focus:border-blue-300"
              >
                  <option value=""></option>
                  {userData.map((room, index) => (
                    <option key={index} value={room.roomname}>
                      {room.roomname}
                    </option>
                  ))} 
              </select>
            </div>

          {/* Book Button */}
          <button onClick={handleBookEvent} className="md:absolute md:left-48 md:top-[100%] mt-5 ml-7 md:w-[170px] text-md text-center opacity-[90%] bg-[#6B739D] hover:text-black hover:font-bold hover:bg-white text-white rounded-full py-3 px-8 shadow-md hover:shadow-2xl hover:shadow-black transition duration-500">
            Book
          </button>
    </form>
    </main>
  )
}
