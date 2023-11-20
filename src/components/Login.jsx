import Link from 'next/link';
import React from 'react';

const LoginForm = () => {
  return (
    <div className="flex relative items-center justify-center mt-72 md:mt-80">
      <div className="absolute right-0 bg-[#3D51BE] rounded-l-3xl px-6 py-32 mt-8 md:px-96 shadow-md w-full md:w-[1321px] flex flex-col gap-2">
        {/* Username Input */}
        <div className="mb-4">
          <label htmlFor="username" className="block text-lg md:text-xl font-bold text-white">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="mt-1 p-3 w-full md:w-[742px] bg-[#6B739D] border-blue-500 rounded-2xl focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter your username"
          />
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-lg md:text-xl font-bold text-white">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="mt-1 p-3 w-full md:w-[742px] bg-[#6B739D] border-blue-500 rounded-2xl focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter your password"
          />
        </div>

        {/* Login Button */}
        <Link href="/book" className="mt-5 md:ml-64 mx-auto md:w-[272px] text-md text-center bg-[#6B739D] hover:text-black hover:font-bold hover:bg-white text-white rounded-full py-3 px-8 shadow-md hover:shadow-2xl hover:shadow-black transition duration-500">
          Login
        </Link>

        {/* Register Link */}
        <div className='mt-2 text-sm md:text-md ml-10 md:ml-72'>
          Don't have an account?
          <Link href="/register" className='text-black hover:text-white ml-1'>
                Register
        </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
