import React from 'react'
import Link from 'next/link'

const Header = () => {
  return (
    <div className='text-4xl text-center md:text-right font-mont md:mr-10 mt-10'>
        <Link href="/">hallsHub </Link>
    </div>
  )
}

export default Header