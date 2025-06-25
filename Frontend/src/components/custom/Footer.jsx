import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLocationArrow,
  FaLocationPin,
  FaLocationPinLock,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { CiLocationOn } from "react-icons/ci";
import { CiPhone } from "react-icons/ci";
import { CiMail } from "react-icons/ci";

function Footer() {
  return (
    <div className="bg-gray-800 py-8 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Travelobe</h2>
            <p className="mb-4">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam
              odio excepturi tempore nisi beatae quibusdam quos error aliquam
              dolorum maiores.
            </p>
          </div>
          <div className="flex flex-col md:items-center ml-8">
            {/* <h4 className="text-lg font-semibold">Quick links</h4> */}
            <div className="flex flex-col mt-4 space-y-2">
              {/* <a href="">Home</a>
              <a href="">About</a>
              <a href="">Chat</a>
              <a href="">Contact</a> */}
              <div className="flex gap-4">
                <CiLocationOn
                  size={24}
                  className="text-white hover:text-blue-600"
                />
                <p>IIIT Lucknow, Lucknow, Uttar Pradesh</p>
              </div>
              <div className="flex gap-4">
                <CiPhone size={24} className="text-white hover:text-blue-600" />
                <p>+91 6969696969</p>
              </div>
              <div className="flex gap-4">
                <CiMail size={24} className="text-white hover:text-blue-600" />
                <p>travelobehelpdesk@gmail.com</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start md:items-end mx-8">
            <h2 className="text-xl font-bold mb-4">Follow Us</h2>
            <div className="flex space-x-4 mb-4">
              <FaFacebookF
                size={24}
                className="text-blue-500 hover:text-blue-600"
              />
              <FaInstagram
                size={24}
                className="text-pink-500 hover:text-pink-600"
              />
              <FaTwitter
                size={24}
                className="text-blue-400 hover:text-blue-500"
              />
              <FaYoutube
                size={24}
                className="text-red-500 hover:text-red-600"
              />
            </div>
            {/* <form className="flex items-center justify-center mt-8">
              <input
                type="email"
                placeholder="Enter Your Email"
                className="w-full p-2 rounded-l-lg bg-gray-800 border border-gray-600"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-r-lg border border-blue-600"
              >
                Subscribe
              </button>
            </form> */}
          </div>
        </div>
        <div className="flex justify-between border-t mt-8 border-gray-700 pt-4">
          <p>@ 2025 Travelobe. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="">Privacy Policy</a>
            <a href="">Terms of services</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;