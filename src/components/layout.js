import Header from "@/components/header";
import Head from "next/head";
import localFont from 'next/font/local';

const myFont = localFont({
    src: '../../public/fonts/Montserrat-Regular.ttf',
    variable: '--font-mont'
  });

export default function Layout({children}) {
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
