import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import CloseIcon from '@mui/icons-material/Close';
import Link from 'next/link';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';

export default function Sidebar() {
    const [open, setOpen] = useState(false);

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
            <div className="md:absolute md:left-10 md:bottom-3 ">
                <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
                {open ? <CloseIcon /> : <MenuIcon className='text-white text-4xl' />}
                </IconButton>
            </div>
            <Drawer anchor="left" open={open} onClose={toggleDrawer} >
            <div className="flex flex-col h-screen w-96 " style={gradientStyle}>
            <div className="bg-[#5268DA] flex justify-between items-center p-3 pr-4 ">
                <div></div>
                <IconButton edge="end" color="inherit" aria-label="close" onClick={toggleDrawer}>
                <CloseIcon />
                </IconButton>
            </div>
            <List className="mt-10 flex flex-col justify-center items-center gap-10 px-10 ">
                <Link href="/" onClick={closeDrawer} >
                <ListItemText
                    primary={
                    <Typography variant="body1" style={{ fontSize: '28px' }}>
                        Profile
                    </Typography>
                    }
                    className='text-white hover:text-[#2F3349]'
                />
                </Link>
                <Link href="/" onClick={closeDrawer}>
                <ListItemText
                    primary={
                    <Typography variant="body1" style={{ fontSize: '28px' }}>
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