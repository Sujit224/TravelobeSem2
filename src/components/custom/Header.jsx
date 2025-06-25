import React, { useState } from "react";
import { Button } from "../ui/button";
import { BsPerson } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import { IoHomeOutline } from "react-icons/io5";
import { IoMdGlobe } from "react-icons/io";
import { FaRegCircleQuestion } from "react-icons/fa6";
import { IoChatboxOutline } from "react-icons/io5";
import { AiOutlineClose } from "react-icons/ai";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaPinterest,
  FaYoutube,
} from "react-icons/fa";


function Header() {
  const [nav, setNav] = useState(false);
  const [logo, setLogo] = useState(false);
  const handleNav = () => {
    setNav(!nav);
    setLogo(!logo);
  };

  return (
    // <div className='p-3 shadow-sm flex justify-between px-5'>
    //   <img src='/logo.svg' alt="Logo" />
    //   <div>
    //     <Button>Sign In</Button>
    //   </div>
    // </div>

    <div className="flex w-[100%] justify-between items-center h-20 px-4   text-black bg-white shadow-sm">
      <div >
        {/* <h2 onClick={handleNav} className={logo ? "hidden" : "block"}>
          Travelobe
        </h2> */}
        <img src="TravelobeLogo.png" alt="Logo" className="h-14 w-auto object-contain mr-4"/>
      </div>
      <ul className="hidden md:flex ">
        <li className="hover:text-green-600 p-4 flex items-center">
          <IoHomeOutline />
          <a href="./" className="px-2">
            Home
          </a>
        </li>
        <li className="hover:text-green-600 p-4 flex items-center">
          <IoMdGlobe />
          <a href="" className="px-2">
            Destination
          </a>
        </li>
        <li className="hover:text-green-600 p-4 flex items-center">
          <FaRegCircleQuestion />
          <a href="" className="px-2">
            About
          </a>
        </li>
        <li className="hover:text-green-600 p-4 flex items-center">
          <IoChatboxOutline />
          <a
              href="http://localhost:3001"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2"
              style={{ textDecoration: 'none', color: 'inherit' }}
          >
              Chat
          </a>
        </li>
      </ul>

      <div className="hidden  md:flex gap-3">
        {/* <BiSearch className="mr-2" size={20} />
        <BsPerson size={20} /> */}

        {/* <button className="mr-2  text-white bg-black border-2 font-medium hover:text-green-400 hover:border-green-400 cursor-pointer  border  text-white rounded-md cursor-pointer h-10">
          Log In
        </button> */}
        <Button>
          Login
        </Button>

        <Button>
          Sign Up
        </Button>
        {/* <button className="border-green-400 text-green-400 border-2  font-medium hover:text-black hover:border-black cursor-pointer p-3 border  text-green-400 rounded-md cursor-pointer">
          SignUp
        </button> */}
      </div>

      {/* Hamburger */}
      <div onClick={handleNav} className="md:hidden z-10">
        {nav ? <AiOutlineClose size={20} /> : <HiOutlineMenuAlt4 size={20} />}
      </div>

      {/* Hamburger Menu dropdown */}
      <div
        onClick={handleNav}
        className={
          nav
            ? "absolute text-black left-[0] top-0 w-full bg-gray-100/90 px-4 py-7 flex-col"
            : "absolute left-[-100%] top-0 w-full bg-gray-100/90 px-4 py-7 flex-col"
        }
      >
        <ul>
          <h2>Travelobe</h2>
          <li className="border-b p-4 flex items-center ">
            <a href="">Home</a>
          </li>
          <li className="border-b p-4 flex items-center ">
            <a href="">Destinations</a>
          </li>
          <li className="border-b p-4 flex items-center ">
            <a href="">About</a>
          </li>
          <li className="border-b p-4 flex items-center ">
            <a
             href="http://localhost:3001"
             target="_blank"
             rel="noopener noreferrer"
             style={{ textDecoration: 'none', color: 'inherit' }}
              >
             Chat
              </a>


          </li>
          <div className=" flex flex-col ">
            <button className="my-2 bg-black p-3 border  text-white rounded-md cursor-pointer">Log In</button>
            <button className="mt-2 bg-black p-3 border  text-white rounded-md cursor-pointer">Sign Up</button>
          </div>

          <div className=" flex justify-between my-6">
            <FaFacebook className="icon" />
            <FaTwitter className="icon" />
            <FaInstagram className="icon" />
            <FaPinterest className="icon" />
            <FaYoutube className="icon" />
          </div>
        </ul>
      </div>
    </div>
  );
}

export default Header;