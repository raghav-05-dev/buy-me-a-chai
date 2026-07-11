import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-black text-white flex justify-around'>
      <div className='logo font-bold'>Buy me a chai</div>
      <ul className='flex justify-between gap-4'>
        <li>home</li>
        <li>about</li>
        <li>projects</li>
        <li>login</li>
      </ul>
    </nav>
  )
}

export default Navbar
