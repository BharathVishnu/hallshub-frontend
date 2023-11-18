import Navbar from "@/components/Navbar";
import Card from '../components/card';
// import eventlist from '../components/eventlist';

export default function Booking() {
//   const cards = eventlist.map(item => (
//     <Eventcard items={item} />
// ));
  return (
    <main>  
        <Navbar/>
        <div className='mt-10 md:ml-20 md:mr-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-16 md:gap-8 lg:gap-16'>
              <Card/>
              <Card/>
              <Card/>
              <Card/>
              {/* {cards} */}
              <Card/>
              <Card/>
              <Card/>
        </div>
    </main>
  )
}