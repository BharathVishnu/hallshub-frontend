import React, { useState,useEffect } from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import CloseIcon from '@mui/icons-material/Close';
import Link from 'next/link';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Person2Icon from '@mui/icons-material/Person2';
import { useAuth } from '@/components/AuthContext';



export default function Sidebar() {
    const [open, setOpen] = useState(false);
    const { username, logout } = useAuth();
    const [loading, setLoading] = useState(false)
    const [club,setClub] = useState('')

    useEffect(() => {
        const fetchClubFromSupabase = async () => {
          try {
            
            const { data, error } = await supabase
              .from('user')
              .select('club')
              .eq('username',username);
            if (error) {
              window.alert('Error fetching data from Supabase:', error.message);
            } else {
                const userClub = data && data.length > 0 ? data[0].club : '';
                setClub(userClub);
            }
          } catch (error) {
            window.alert('Unexpected error:', error.message);
          } finally {
            setLoading(false); // Set loading to false whether fetching was successful or not
          }
        };
        fetchClubFromSupabase();
      }, []);
    const toggleDrawer = () => {
      setOpen(!open);
    };
  
    const closeDrawer = () => {
      setOpen(!open);
    };
    const gradientStyle = {
        backgroundImage: 'linear-gradient(to bottom, #5268DA, #495CC3,#2F3349)',
      };

    return(
        <div className='relative'>
            <div data-aos="left" className="absolute left-2 md:left-10 bottom-10 md:bottom-3 ">
                <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
                {open ? <CloseIcon /> : <MenuIcon className='text-white text-4xl' />}
                </IconButton>
            </div>
            <Drawer anchor="left" open={open} onClose={toggleDrawer} >
            <div className="flex flex-col h-screen w-screen md:w-96 " style={gradientStyle}>
            <div className="bg-[#5268DA] flex justify-between items-center p-3 pr-4 ">
                <div></div>
                <IconButton edge="end" color="inherit" aria-label="close" onClick={toggleDrawer}>
                <CloseIcon />
                </IconButton>
            </div>
            <List className="mt-10 flex flex-col justify-center items-center gap-10 px-10 ">
                <Link href="/" onClick={closeDrawer} className='flex flex-row justify-between items-center gap-5 '>
                    <Person2Icon className='text-4xl text-white hover:text-[#2F3349]'/>
                </Link>
                <div className='mb-80 md:mb-96 flex flex-col gap-8'>
                    <div className='opacity-[100%] bg-[#6B739D] w-48 text-white text-2xl font-mont flex flex-row justify-center rounded-xl shadow-xl'>
                        {username}
                    </div>
                    <div className='opacity-[100%] bg-[#6B739D] w-48 text-white text-2xl font-mont flex flex-row justify-center rounded-xl shadow-xl'>
                        {club}
                    </div>
                </div>
                <Link href="/"   onClick={() => {
                                    logout();
                                    closeDrawer();
                                }} 
                                    className='mr-20 flex flex-row justify-between items-center gap-8'> 
                <ExitToAppIcon className='text-white text-4xl hover:text-[#2F3349]'/>
                <ListItemText
                    primary={
                    <Typography variant="body1" style={{ fontSize: '28px' , fontFamily:'var(--font-mont)'}}>
                       Logout
                    </Typography>
                    }
                    className='text-white hover:text-[#2F3349]'
                />
                </Link>
            </List>
            </div>
        </Drawer>
        </div>
    );

}
