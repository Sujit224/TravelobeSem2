import React, { useEffect, useState } from "react";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout } from "@react-oauth/google";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    console.log(user);
  }, []);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => {
      console.log("OAuth Success:", codeResp);

      GetUserProfile(codeResp.access_token);
    },
    onError: (error) => console.log("OAuth Error:", error),
  });

  const GetUserProfile = async (access_token) => {
    try {
      const response = await fetch(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user info");
      }

      const userData = await response.json();
      console.log("User Info:", userData);
      // Store user data in localStorage
      localStorage.setItem("user", JSON.stringify(userData));
      setOpenDialog(false);
      window.location.reload();
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  const [nav, setNav] = useState(false);
  const [logo, setLogo] = useState(false);
  const handleNav = () => {
    setNav(!nav);
    setLogo(!logo);
  };

  return (
    <div className="flex w-[100%] justify-between items-center h-20 px-4   text-black bg-white shadow-sm">
      <div>
        <img
          src="/TravelobeLogo.png"
          alt="Logo"
          className="h-14 w-auto object-contain mr-4"
        />
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
            RateUs
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
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Chat
          </a>
        </li>
      </ul>

      <div className="hidden  md:flex gap-3 ">
        {user ? (
          <div className="flex items-center gap-3">
            <a href="/my-trips">
              <Button variant="outline" className="rounded-full">
                My-Trips
              </Button>
            </a>

            <Popover>
              <PopoverTrigger>
                <img
                  src={user?.picture}
                  className="h-[35px] w-[35px] rounded-full"
                />
              </PopoverTrigger>
              <PopoverContent>
                <h2
                  className="cursor-pointer"
                  onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    window.location.reload();
                  }}
                >
                  Logout
                </h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button onClick={() => setOpenDialog(true)}>SignIn</Button>
        )}
      </div>

      <Dialog open={openDialog}>
        <DialogContent className="bg-white p-6 rounded-xl shadow-lg max-w-sm">
          <DialogHeader>
            <DialogDescription>
              <img src="/TravelobeLogo.png" />
              <h2 className="font-bold text-lg mt-3">Sign In with Google</h2>
              <p>Sign in to the App with Google authentication securely</p>

              <Button
                onClick={login}
                varient="outline"
                className="mt-5 w-full flex gap-2 items-center"
              >
                <FcGoogle className="h-10 w-8" />
                Sign In with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

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
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Chat
            </a>
          </li>
          <div className=" flex flex-col ">
            <button className="my-2 bg-black p-3 border  text-white rounded-md cursor-pointer">
              Log In
            </button>
            <button className="mt-2 bg-black p-3 border  text-white rounded-md cursor-pointer">
              Sign Up
            </button>
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
