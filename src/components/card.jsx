import React, { useEffect, useState } from 'react';
import { supabase } from '../pages/supabase';

const Card = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchDataFromSupabase = async () => {
      try {
        const { data, error } = await supabase
          .from('user')
          .select('*');
        console.log(data);
        if (error) {
          console.error('Error fetching data from Supabase:', error.message);
        } else {
          setUserData(data);
        }
      } catch (error) {
        console.error('Unexpected error:', error.message);
      }
    };

    fetchDataFromSupabase();
  }, []); 

  return (
    <div className="font-mont card text-white hover:text-black border-2 border-white hover:border-black relative overflow-hidden rounded-lg p-6 shadow-2xl transition duration-300 ease-in-out hover:opacity-100 transform hover:scale-105 hover:bg-white">
      <h2 className="text-2xl font-bold">Cloud Study Jam</h2>
      <h3 className="text-2xl font-semibold mb-4">GDSC</h3>
      <h4 className="text-2xl font-bold mb-2">APJ HALL</h4>
      <div className="border-b-4 rounded-xl border-gray-300 mb-4"></div>
      {userData ? (
        <div className='flex flex-row justify-between'>
          <div className='font-bold'>20 Nov 2023</div>
          <div className='font-bold'>5.00</div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Card;
