import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../pages/supabase';
import { useAuth } from '@/components/AuthContext';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { setAuthenticatedUser } = useAuth();

  const fetchDataFromSupabase = async () => {
    try {
      const { data, error } = await supabase
        .from('user') 
        .select('*')
        .eq('username', username)
        .eq('password', password);

      if (error) {
        window.alert("Invalid Server Error");
      }

      if (data.length === 1) {
        setAuthenticatedUser(username);
        router.push('/book'); 
      } else {
        window.alert("Invalid Credentials");
      }
    } catch (error) {
      window.alert("Server Error");
    }
  };

  const handleLoginClick = () => {
    fetchDataFromSupabase();
  };

  const gradientStyle = {
    backgroundImage: 'linear-gradient(to bottom,#3D51BE,#3E4B91,#394378)',
  };

  return (
    <div className="flex relative items-center justify-center mt-72 md:mt-80">
      <div className="font-mont absolute right-0  rounded-l-3xl px-8 py-24 mt-8 md:px-72 shadow-2xl w-full md:w-[1321px] flex flex-col gap-2" style={gradientStyle}>
        {/* Username Input */}
        <div className="mb-4">
          <label htmlFor="username" className="block text-lg md:text-xl font-bold text-white">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 p-3 w-full md:w-[742px] opacity-[80%] bg-[#6B739D] border-blue-500 rounded-2xl focus:outline-none focus:ring focus:border-blue-300"
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="text-white mt-1 p-3 w-full md:w-[742px] opacity-[80%] bg-[#6B739D] border-blue-500 rounded-2xl focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter your password"
          />
        </div>

        {/* Login Button */}
        <div
          className="mt-5 md:ml-50 mx-auto md:w-[272px] opacity-[90%] text-md text-center bg-[#6B739D] hover:text-black hover:font-bold hover:bg-white text-white rounded-full py-3 px-8 shadow-md hover:shadow-2xl hover:shadow-black transition duration-500"
          onClick={handleLoginClick}
        >
          Login
        </div>

        {/* Register Link */}
        <div className='mt-2 text-sm md:text-md ml-10 md:ml-64'>
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
