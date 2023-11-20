import React, { useState, useEffect } from 'react';
import Navbar from "@/components/Navbar";
import Loading from "@/components/Loading";
import Card from '../components/card';
import Sidebar from '@/components/Sidebar';
// import eventlist from '../components/eventlist';

export default function Booking() {
//   const cards = eventlist.map(item => (
//     <Eventcard items={item} />
// ));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch your data here


      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };

    fetchData();
  }, []);
  return (
    <main>  
        <Sidebar/>
        <Navbar/>
        {loading ? (
        <Loading />
      ) : (
        <div className='mt-10 md:mb-14 md:ml-20 md:mr-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-16 md:gap-8 lg:gap-16'>
              <Card/>
              {/* cards */}
              <Card/>
              <Card/>
              <Card/>
              <Card/>
              <Card/>
              <Card/>
        </div> 
      )} 

    </main>
  )
}