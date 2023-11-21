import React, { useState, useEffect } from 'react';
import Navbar from "@/components/Navbar";
import Loading from "@/components/Loading";
import Card from '../components/card';
import Sidebar from '@/components/Sidebar';
import { supabase } from '../pages/supabase';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export default function Booking() {
  const items = [
    { section: 'All', category: 'All' },
    { section: 'Technical', category: 'Technical' },
    { section: 'Cultural', category: 'Cultural' },
    { section: 'Hackathon', category: 'Hackathon' },
    { section: 'Workshop', category: 'Workshop' }
  ];
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedSection, setSelectedSection] = useState('All');

  const filteredResources = selectedSection === 'All'
    ? userData
    : userData.filter(data => data.eventcategory === selectedSection);

  const renderedCards = filteredResources.map(userData => (
    <Card key={userData.id} userData={userData} />
  ));

  const handleCarouselChange = (index) => {
    setSelectedSection(items[index].category);
  };

  useEffect(() => {
    const fetchDataFromSupabase = async () => {
      try {
        const { data, error } = await supabase
          .from('booking')
          .select('*');
        if (error) {
          console.error('Error fetching data from Supabase:', error.message);
        } else {
          setUserData(data);
        }
      } catch (error) {
        console.error('Unexpected error:', error.message);
      } finally {
        setLoading(false); // Set loading to false whether fetching was successful or not
      }
    };

    fetchDataFromSupabase();
  }, []); 

  return (
    <main>  
      <Sidebar/>
      <Navbar/>
      {loading ? (
        <Loading />
      ) : (
        <div>
           <Carousel
              showStatus={false}
              showThumbs={false}
              className="mr-16 ml-16 md:mr-64 md:ml-64"
              onChange={handleCarouselChange}
            >
              {items.map((item, index) => (
                <div
                  key={index}
                  className="p-8 font-mont text-white text-xl cursor-pointer"
                >
                  {item.section}
                </div>
              ))}
            </Carousel>
            <div className='mt-10 md:mb-14 md:ml-20 md:mr-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-16 md:gap-8 lg:gap-16'>
                  {
                renderedCards.length > 0 ? 
                (
                  renderedCards
                ) 
                : 
                (
                  <div className="font-mont text-center text-2xl">no events found</div>
                )
              }
            </div>
        </div>
        

      )} 
    </main>
  );
}
