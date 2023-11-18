import React from 'react';

const RoundedCard = () => {
  return (
    <div className="text-white hover:text-black border-2 border-white hover:border-black relative overflow-hidden rounded-lg p-6 shadow-2xl transition duration-300 ease-in-out hover:opacity-100 transform hover:scale-105 hover:bg-white">
      <h2 className="text-2xl font-bold ">Cloud Study Jam</h2>
      <h3 className="text-2xl font-semibold mb-4">GDSC</h3>
      <h4 className="text-2xl font-bold mb-2">APJ HALL</h4>
      <div className="border-b-4 rounded-xl border-gray-300 mb-4"></div>
      <div className='flex flex-row justify-between'>
        <div className='font-bold'>20 Nov 2023</div>
        <div className='font-bold'>5 p.m</div>
      </div>
    </div>
  );
};

export default RoundedCard;
