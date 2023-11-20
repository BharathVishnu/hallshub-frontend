import Link from 'next/link';
import { useRouter } from 'next/router';

const Navbar = () => {
  const router = useRouter();

  return (
    <nav className="flex flex-col md:flex-row items-center justify-start md:justify-start ml-4 md:ml-24 gap-4 md:gap-24 py-4 mt-10 md:mt-2">
      <Link href="/book" className={`text-3xl font-bold text-white hover:text-black pb-2 md:pb-0 ${router.pathname === '/book' ? ' md:border-b-4 md:border-white-500 md:hover:border-black md:text-white' : 'md:text-gray-400'}`}>
          Book
      </Link>
      <Link href="/events" className={`text-3xl font-bold text-white hover:text-black pb-2 md:pb-0 ${router.pathname === '/events' ? ' md:border-b-4 md:border-white-500 md:hover:border-black md:text-white' : 'md:text-gray-400'}`}>
          Events
      </Link>
    </nav>
  );
};

export default Navbar;
