import React, { useEffect, useState } from 'react';

const Card = ({ userData }) => {
  const [formattedStartDate, setFormattedStartDate] = useState('');
  const [formattedEndDate, setFormattedEndDate] = useState('');
  const [formattedStartTime, setFormattedStartTime] = useState('');
  const [formattedEndTime, setFormattedEndTime] = useState('');

  useEffect(() => {
    const optionsDate = {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      dayFirst: 'numeric',
    };

    const optionsTime = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };

    try {
      if (userData.startdate && userData.enddate) {
        // Format Date
        const startDateFormatted = new Intl.DateTimeFormat('en-US', optionsDate).format(new Date(userData.startdate));
        const endDateFormatted = new Intl.DateTimeFormat('en-US', optionsDate).format(new Date(userData.enddate));

        // Format Time
        const startTimeFormatted = new Intl.DateTimeFormat('en-US', optionsTime).format(new Date(userData.startdate));
        const endTimeFormatted = new Intl.DateTimeFormat('en-US', optionsTime).format(new Date(userData.enddate));

        // Set Formatted Date and Time
        setFormattedStartDate(startDateFormatted);
        setFormattedStartTime(startTimeFormatted);
        setFormattedEndDate(endDateFormatted);
        setFormattedEndTime(endTimeFormatted);
      }
    } catch (error) {
      console.error("Error formatting dates:", error);
    }
  }, [userData.startdate, userData.enddate]);

  return (
    <div className="card text-white hover:text-black border-2 border-white hover:border-black relative overflow-hidden rounded-lg p-6 shadow-2xl transition duration-300 ease-in-out hover:opacity-100 transform hover:scale-105 hover:bg-white">
      <h2 className="text-2xl font-bold">{userData.eventname}</h2>
      <h3 className="text-2xl font-semibold mb-4">{userData.club}</h3>
      <h4 className="text-2xl font-bold mb-2">{userData.roomname}</h4>
      <div className="border-b-4 rounded-xl border-gray-300 mb-4"></div>
      <div className='flex flex-row justify-between'>
        <div className='font-bold'>{formattedStartDate}</div>
        <div className='font-bold'>{formattedStartTime}</div>
      </div>
      <div className='flex flex-row justify-between'>
        <div className='font-bold'>{formattedEndDate}</div>
        <div className='font-bold'>{formattedEndTime}</div>
      </div>
    </div>
  );
};

export default Card;
