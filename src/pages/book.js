import Navbar from "@/components/Navbar";
import Link from 'next/link';
import Sidebar from "@/components/Sidebar";
import { supabase } from '../pages/supabase';
import { useState, useEffect } from 'react';

export default function Booking() {
  const [eventName, setEventName] = useState('');
  const [eventCategory, setEventCategory] = useState('');
  const [expectedAttendees, setExpectedAttendees] = useState('');
  const [fromDateTime, setFromDateTime] = useState('');
  const [toDateTime, setToDateTime] = useState('');
  const [venue, setVenue] = useState('');
  const [availableVenues, setAvailableVenues] = useState([]);

  useEffect(() => {
    // Fetch available venues based on capacity and availability
    const fetchAvailableVenues = async () => {
      try {
        const occupiedRooms = await supabase
          .from('Occupancy')
          .select('RoomName')
          .gte('StartDate', fromDateTime)
          .lte('EndDate', toDateTime);
    
        if (occupiedRooms.error) {
          throw occupiedRooms.error;
        }
    
        const occupiedRoomNames = (occupiedRooms.data || []).map((room) => room.RoomName);
    
        const { data, error } = await supabase
          .from('Rooms')
          .select('RoomName, Capacity')
          .not('RoomName', 'in', occupiedRoomNames)
          .lte('Capacity', expectedAttendees);
    
        if (error) {
          throw error;
        }
    
        setAvailableVenues(data || []);
      } catch (error) {
        console.error('Error fetching available venues', error);
        setAvailableVenues([]);
      }
    };
    
    
    // Fetch available venues when fromDateTime, toDateTime, and expectedAttendees change
    if (fromDateTime && toDateTime && expectedAttendees) {
      fetchAvailableVenues();
    }
  }, [fromDateTime, toDateTime, expectedAttendees]);

  const handleBookEvent = async () => {
    try {
      // Insert the booking details into the database
      const { data, error } = await supabase
        .from('BOOKING')
        .upsert([
          {
            EventName: eventName,
            EventCategory: eventCategory,
            ExpectedAttendees: expectedAttendees,
            StartDate: fromDateTime,
            EndDate: toDateTime,
            RoomName: venue,
          },
        ]);

      if (error) {
        throw error;
      }

      // Update the Occupancy table
      await supabase
        .from('Occupancy')
        .upsert([
          {
            RoomName: venue,
            StartDate: fromDateTime,
            EndDate: toDateTime,
          },
        ]);

      // Handle successful booking, e.g., show a success message or redirect to a confirmation page
      window.alert('Event booked successfully');
      
    } catch (error) {
      window.alert('Error booking event. Please try again.');
      console.log(error)
    }
  };

  return (
    <main>
      <Sidebar />
      <Navbar />
      <div className="font-mont relative rounded-l-3xl w-full md:w-[1321px] flex flex-col items-center justify-center mx-auto mt-10 gap-2">
        {/* Event */}
        <div className="ml-5 mb-4">
          <label htmlFor="eventname" className="block text-lg md:text-xl font-bold text-white">
            Event Name
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
          <input
            type="text"
            id="category"
            value={eventCategory}
            onChange={(e) => setEventCategory(e.target.value)}
            className="mt-1 p-2 w-full md:w-[900px] opacity-[80%] bg-[#6B739D] border-blue-500 rounded-2xl focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        {/* Expected Attendees */}
        <div className="ml-5 mb-4">
          <label htmlFor="attendees" className="block text-lg md:text-xl font-bold text-white">
            Expected Attendees
          </label>
          <input
            type="text"
            id="attendees"
            value={expectedAttendees}
            onChange={(e) => setExpectedAttendees(e.target.value)}
            className="mt-1 p-2 w-full md:w-[900px] opacity-[80%] bg-[#6B739D] border-blue-500 rounded-2xl focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="flex flex-col md:flex-row gap-36">
          {/* From */}
          <div className="ml-5 mb-4">
            <label htmlFor="from" className="block text-lg md:text-xl font-bold text-white">
              From
            </label>
            <input
              type="datetime-local"
              id="from"
              value={fromDateTime}
              onChange={(e) => setFromDateTime(e.target.value)}
              className="mt-1 p-2 w-full md:w-[350px] opacity-[80%] bg-[#6B739D] border-blue-500 rounded-2xl focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          {/* To */}
          <div className="ml-12 mb-4">
            <label htmlFor="to" className="block text-lg md:text-xl font-bold text-white">
              To
            </label>
            <input
              type="datetime-local"
              id="to"
              value={toDateTime}
              onChange={(e) => setToDateTime(e.target.value)}
              className="mt-1 p-2 w-full md:w-[350px] opacity-[80%] bg-[#6B739D] border-blue-500 rounded-2xl focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
        </div>

        {/* Venue*/}
        <div className="ml-5 mb-4">
          <label htmlFor="venue" className="block text-lg md:text-xl font-bold text-white">
            Venue
          </label>
          <select
            id="venue"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
            className="mt-1 p-3 w-full md:w-[900px] opacity-[60%] bg-[#6B739D] border-blue-500 rounded-2xl focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="" disabled>Select a venue</option>
            {availableVenues.map((availableVenue) => (
              <option key={availableVenue.RoomName} value={availableVenue.RoomName}>
                {availableVenue.RoomName}
              </option>
            ))}
          </select>

        </div>
        {/* Book Button */}
        <div
          onClick={handleBookEvent}
          className="md:absolute md:left-48 md:top-[100%] mt-5 ml-7 md:w-[170px] text-md text-center opacity-[90%] bg-[#6B739D] hover:text-black hover:font-bold hover:bg-white text-white rounded-full py-3 px-8 shadow-md hover:shadow-2xl hover:shadow-black transition duration-500"
        >
          Book
        </div>
      </div>
    </main>
  );
}
