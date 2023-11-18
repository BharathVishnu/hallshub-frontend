import Navbar from "@/components/Navbar";
import Link from 'next/link';

export default function Booking() {
  return (
    <main>  
        <Navbar/>
        <div className="rounded-l-3xl w-full md:w-[1321px] flex flex-col justify-center mx-auto mt-20 gap-2">
          {/* Event */}
          <div className="ml-5 mb-4">
            <label htmlFor="username" className="block text-lg md:text-xl font-bold text-white">
              event name 
            </label>
            <input
              type="text"
              id="eventname"
              className="mt-1 p-2 w-full md:w-[900px] bg-[#6B739D] border-blue-500 rounded-2xl focus:outline-none focus:ring focus:border-blue-300"
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
              className="mt-1 p-2 w-full md:w-[900px] bg-[#6B739D] border-blue-500 rounded-2xl focus:outline-none focus:ring focus:border-blue-300"
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
              className="mt-1 p-2 w-full md:w-[900px] bg-[#6B739D] border-blue-500 rounded-2xl focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          
          <div className="flex flex-col md:flex-row gap-36">
            {/* From */}
            <div className="ml-5 mb-4">
              <label htmlFor="password" className="block text-lg md:text-xl font-bold text-white">
                from
              </label>
              <input
                type="date"
                id="from"
                className="mt-1 p-2 w-full md:w-[350px] bg-[#6B739D] border-blue-500 rounded-2xl focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            {/* To */}
            <div className="ml-12 mb-4">
              <label htmlFor="password" className="block text-lg md:text-xl font-bold text-white">
                to
              </label>
              <input
                type="date"
                id="password"
                className="mt-1 p-2 w-full md:w-[350px] bg-[#6B739D] border-blue-500 rounded-2xl focus:outline-none focus:ring focus:border-blue-300"
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
                className="mt-1 p-2 w-full md:w-[900px] bg-[#6B739D] border-blue-500 rounded-2xl focus:outline-none focus:ring focus:border-blue-300"
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
          <Link href="/" className="mt-5 ml-5 md:w-[172px] text-md text-center bg-[#6B739D] hover:text-black hover:font-bold hover:bg-white text-white rounded-full py-3 px-8 shadow-md hover:shadow-2xl hover:shadow-black transition duration-500">
            Book
          </Link>
    </div>
    </main>
  )
}