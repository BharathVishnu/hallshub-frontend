import Link from 'next/link';
import React from 'react';

const Register = () => {
  return (
    <div className="flex relative items-center justify-center mt-70 md:mt-80">
      <div className="absolute right-1 bg-[#3D51BE] rounded-l-3xl px-6 py-12 md:px-96 shadow-md w-full md:w-[1321px] flex flex-col gap-2">
        {/* Username Input */}
        <div className="mb-4 md:ml-[-56px]">
          <label htmlFor="username" className="block text-lg md:text-xl font-bold text-white">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="mt-1 p-2 w-full md:w-[742px] bg-[#6B739D] border-blue-500 rounded-2xl focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        {/* Club  */}
        <div className="mb-4 md:ml-[-56px]">
          <label htmlFor="username" className="block text-lg md:text-xl font-bold text-white">
            Club/Org Name
          </label>
          <input
            type="text"
            id="cluborg"
            className="mt-1 p-2 w-full md:w-[742px] bg-[#6B739D] border-blue-500 rounded-2xl focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4 md:ml-[-56px]">
          <label htmlFor="username" className="block text-lg md:text-xl font-bold text-white">
            Password
          </label>
          <input
            type="text"
            id="password"
            className="mt-1 p-2 w-full md:w-[742px] bg-[#6B739D] border-blue-500 rounded-2xl focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        {/* Password Input */}
        <div className="mb-4 md:ml-[-56px]">
          <label htmlFor="password" className="block text-lg md:text-xl font-bold text-white">
            Confirm Password
          </label>
          <input
            type="password"
            id="password"
            className="mt-1 p-2 w-full md:w-[742px] bg-[#6B739D] border-blue-500 rounded-2xl focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        {/* Login Button */}
        <Link href="/" className="mt-5 md:ml-32 mx-auto md:w-[272px] text-md text-center bg-[#6B739D] hover:text-black hover:font-bold hover:bg-white text-white rounded-full py-3 px-8 shadow-md hover:shadow-2xl hover:shadow-black transition duration-500">
          Register
        </Link>

        {/* Register Link */}
        <div className='mt-2 text-sm md:text-md ml-10 md:ml-40'>
          Already have an account? 
          <Link href="/" className='text-black hover:text-white ml-1'>
                Login
        </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
