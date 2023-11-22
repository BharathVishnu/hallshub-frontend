import Link from 'next/link';
import React from 'react';
import { useState } from 'react';
import { supabase } from '../pages/supabase';
import { useRouter } from 'next/router';

const Register = () => {
  const [username, setUsername] = useState('');
  const [club, setClub] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();


  const gradientStyle = {
    backgroundImage: 'linear-gradient(to bottom,#3D51BE,#3E4B91,#394378)',
  };
  const handleRegister = async () => {
    // Check if password and confirm password match
    if (password !== confirmPassword) {
      window.alert('Password and Confirm Password must match');
    }

    try {
      // Check if username already exists
      const { data: existingUsers, error } = await supabase
        .from('user')
        .select('username')
        .eq('username', username);

      if (error) {
        window.alert('Internal Server Error');
      }

      if (existingUsers.length > 0) {
        window.alert('Username already taken. Please choose another one.');
      }

      // // If username is unique, proceed with registration
      // const { user, error: registrationError } = await supabase.auth.signUp({
      //   email: username, // Assuming the username is an email address
      //   password,
      // });

      // if (registrationError) {
      //   console.error('Registration error:', registrationError);
      //   setErrorMessage('Registration failed. Please try again.');
      //   return;
      // }

      // Add user details to the user table
      const { data: newUser, error: addUserError } = await supabase
        .from('user')
        .upsert([{ username, password, club }], { onConflict: ['username'] });

      if (addUserError) {
        window.alert('User creation failed. Please try again.');
      }
      else{
        router.push('/')
      }
      
    } catch (error) {
      console.log(error)
      window.alert('Registration failed. Please try again.');
    }
  };

  return (
    <div data-aos="fade-down"  className="font-mont flex relative items-center justify-center mt-96 md:mt-80">
      <div className="absolute right-1 bg-[#3D51BE] rounded-l-3xl px-6 py-12 md:px-96 shadow-2xl w-full md:w-[1321px] flex flex-col gap-2"  style={gradientStyle}>
        {/* Username Input */}
        <div className="mb-4 md:ml-[-56px]">
          <label htmlFor="username" className="block text-lg md:text-xl font-bold text-white">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 p-2 w-full md:w-[742px] opacity-[80%] bg-[#6B739D] border-blue-500 rounded-2xl focus:outline-none focus:ring focus:border-blue-300"
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
            value={club}
            onChange={(e) => setClub(e.target.value)}
            className="mt-1 p-2 w-full md:w-[742px]  opacity-[80%] bg-[#6B739D] border-blue-500 rounded-2xl focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4 md:ml-[-56px]">
          <label htmlFor="username" className="block text-lg md:text-xl font-bold text-white">
            Password
          </label>
          <input
            type="text"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-2 w-full md:w-[742px] opacity-[80%] bg-[#6B739D] border-blue-500 rounded-2xl focus:outline-none focus:ring focus:border-blue-300"
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
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-1 p-2 w-full md:w-[742px] opacity-[80%] bg-[#6B739D] border-blue-500 rounded-2xl focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        {/* Login Button */}
        <div onClick={handleRegister} className="mt-5 md:ml-32 mx-auto md:w-[272px] text-md text-center opacity-[80%] bg-[#6B739D] hover:text-black hover:font-bold hover:bg-white text-white rounded-full py-3 px-8 shadow-md hover:shadow-2xl hover:shadow-black transition duration-500">
          Register
        </div>

        {/* Register Link */}
        <div className='opacity-[80%] mt-2 text-sm md:text-md ml-10 md:ml-40'>
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
