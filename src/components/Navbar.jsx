import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";



function Navbar() {

  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate('/login');
    // Refresh the page to reflect changes
  };

  return (
    <div className="flex gap-5 justify-between items-center py-1.5 px-6 rounded-3xl backdrop-blur-[17.5px] bg-opacity-80 w-full max-w-full flex-wrap sm:flex-nowrap sm:py-4 sm:px-10 bg-[#ffffffff]">
      <div className="flex gap-2 justify-between items-center py-1.5 my-auto w-full sm:w-auto">
        <div className="flex justify-center items-center px-0.5">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/96ed444f12f2297ccd4006841bd1831940e6f23d36396492d16831d2cdf15c29?apiKey=5b7d47d822c447fbbf3f0faf7f51790e&"
            className="aspect-[1.14] w-[41px]"
            alt="Logo"
          />
        </div>
        <div className="my-auto uppercase font-extrabold text-lg text-zinc-950">
             Admin Portal
        </div>
      </div>
      {token && (
        <nav className="flex sm:flex-row flex-col gap-5 justify-center items-center self-stretch my-auto text-base text-center text-neutral-900 font-light w-full sm:w-auto">
       <Link to='/feedback'>   <div className="justify-center py-2 cursor-pointer">Feedback</div> </Link>
          <div className="justify-center py-2 cursor-pointer">Students</div>
        </nav>
      )}
       {token ? (
        <button
          onClick={handleLogout}
          className="justify-center self-stretch sm:self-auto px-6 py-5 text-base leading-6 text-center text-white rounded-2xl bg-neutral-900 max-md:px-5 font-light w-full sm:w-auto"
        >
          Logout
        </button>
      ) : (
        <Link to="/login">
          <button
            className="justify-center self-stretch sm:self-auto px-6 py-5 text-base leading-6 text-center text-white rounded-2xl bg-neutral-900 max-md:px-5 font-light w-full sm:w-auto"
          >
            Login
          </button>
        </Link>
      )}
    </div>
  );
}

export default Navbar;
