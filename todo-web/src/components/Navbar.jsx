import React from 'react'

const Navbar = () => {
  return (
    <div>
      <div className="nav flex justify-around bg-violet-700 h-10 items-center w-[100vw] text-white font-bold text-sm">
    
        <div className="logo">ITask</div>
        <div className="flex gap-7 ">
       <div className="home p-2 hover:bg-violet-800  cursor-pointer rounded-md">Home</div>
       <div className="task">Upcoming Events</div>
       </div>
      </div>
    </div>
  )
}

export default Navbar
