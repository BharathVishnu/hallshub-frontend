import Login from "@/components/Login";
import React, { useState, useEffect } from 'react';
import Loading from "@/components/Loading";

export default function Home() {
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
      {loading ? (
        <Loading />
      ) : (
        <Login/>
      )} 
    </main>
  )
}