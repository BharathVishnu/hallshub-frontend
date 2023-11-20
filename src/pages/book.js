import Navbar from "@/components/Navbar";
import Link from 'next/link';
import Sidebar from "@/components/Sidebar";

export default function Booking() {
  return (
    <main>  
        <Sidebar/>
        <Navbar/>
        <div className="relative rounded-l-3xl w-full md:w-[1321px] flex flex-col items-center justify-center mx-auto mt-10 gap-2">
          {/* Event */}
          <div className="ml-5 mb-4">
            <label htmlFor="username" className="block text-lg md:text-xl font-bold text-white">
              event name 
            </label>
            <input
              type="text"
              id="eventname"
              className="mt-1 p-2 w-full md:w-[900px] opacity-[80%] bg-[#6B739D] border-blue-500 rounded-2xl focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          {/* Event Category */}
          <div className="ml-5 mb-4">
            <label htmlFor="username" className="block text-lg md:text-xl font-bold text-white">
              event category
            </label>
            <input
              type="text"
              id="category"
              className="mt-1 p-2 w-full md:w-[900px] opacity-[80%] bg-[#6B739D] border-blue-500 rounded-2xl focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          {/* Expected Attendees */}
          <div className="ml-5 mb-4">
            <label htmlFor="username" className="block text-lg md:text-xl font-bold text-white">
              expected attendees
            </label>
            <input
              type="text"
              id="attendees"
              className="mt-1 p-2 w-full md:w-[900px] opacity-[80%] bg-[#6B739D] border-blue-500 rounded-2xl focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          
          <div className="flex flex-col md:flex-row gap-36">
            {/* From */}
            <div className="ml-5 mb-4">
              <label htmlFor="password" className="block text-lg md:text-xl font-bold text-white">
                from
              </label>
              <input
                type="datetime-local"
                id="from"
                className="mt-1 p-2 w-full md:w-[350px] opacity-[80%] bg-[#6B739D] border-blue-500 rounded-2xl focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            {/* To */}
            <div className="ml-12 mb-4">
              <label htmlFor="password" className="block text-lg md:text-xl font-bold text-white">
                to
              </label>
              <input
                type="datetime-local"
                id="password"
                className="mt-1 p-2 w-full md:w-[350px] opacity-[80%] bg-[#6B739D] border-blue-500 rounded-2xl focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
          </div>


          {/* Venue*/}
          <div className="ml-5 mb-4">
              <label htmlFor="password" className="block text-lg md:text-xl font-bold text-white">
                venue
              </label>
              <select
                id="venue"
                className="mt-1 p-2 w-full md:w-[900px] opacity-[80%] bg-[#6B739D] border-blue-500 rounded-2xl focus:outline-none focus:ring focus:border-blue-300"
              >
                <option value="venue1">APJ Hall</option>
                <option value="venue2">PTA Hall</option>
                <option value="venue2">Jubilee Hall</option>
                <option value="venue2">Seminar Hall</option>
                <option value="venue3">Auditorium</option>
                <option value="venue3">System Software Lab</option>
                <option value="venue3">Foss Lab</option>
                <option value="venue3">Networking Lab</option>

              </select>
            </div>

          {/* Book Button */}
          <Link href="/" className="md:absolute md:left-48 md:top-[100%] mt-5 ml-7 md:w-[170px] text-md text-center opacity-[90%] bg-[#6B739D] hover:text-black hover:font-bold hover:bg-white text-white rounded-full py-3 px-8 shadow-md hover:shadow-2xl hover:shadow-black transition duration-500">
            Book
          </Link>
    </div>
    </main>
  )
}