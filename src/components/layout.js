import Header from "@/components/header";
import Head from "next/head";
import localFont from 'next/font/local';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const myFont = localFont({
    src: '../../public/fonts/Montserrat-Regular.ttf',
    variable: '--font-mont'
  });

export default function Layout({children}) {
    useEffect(() => {
        AOS.init({
          duration: 1000,
        });
        AOS.refresh();
      }, [])

    const gradientStyle = {
        backgroundImage: 'linear-gradient(to bottom, #5268DA, #495CC3,#2F3349)',
      };
    return(
    <>
        <Head>
            <title>Halls-Hub</title>
        </Head>
        <div className={`${myFont.variable} flex flex-col min-h-screen`} style={gradientStyle}>
            <Header/>
            <main className="flex-auto min-h-screen">{children}</main>
        </div>
    </>
    );
};
