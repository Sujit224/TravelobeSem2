import React from 'react'
import StarRating from '@/components/custom/Rating';
import { useState } from 'react';
import { useEffect } from 'react';
import { GetPlaceDetails } from '@/service/GlobalAPI';
import { PHOTO_REF_URL } from '@/service/GlobalAPI';

function HotelCardItems({hotel}) {
    if (!hotel) return null;
    
    const [imgUrl,setImgUrl]=useState();
      useEffect(()=>{
        hotel&&GetPlacePhoto();
      },[hotel])
      
      const GetPlacePhoto=async()=>{
        const data = {
          textQuery:hotel?.hotelName
        }
        const result = await GetPlaceDetails(data).then(resp=>{
          console.log(resp.data);
    
         const  PhotoUrl = PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name);
          setImgUrl(PhotoUrl)
        })
      }
    
  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-md hover:scale-105 transition-transform cursor-pointer">
      <img
        src={imgUrl}
        alt={hotel?.hotelName}
        className="rounded-t-xl h-48 w-full object-cover"
      />

      <div className="flex flex-col justify-between flex-1 p-4">
        <div className="mb-4">
          <h2 className="font-semibold text-lg mb-1">{hotel?.hotelName}</h2>
          <h2 className="text-xs text-gray-500">📍 {hotel?.address}</h2>
        </div>

        <div className="flex flex-wrap items-center justify-between mt-auto mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-semibold">{hotel.rating}</span>
            <StarRating rating={hotel.rating || 0} />
          </div>

            <p className="text-sm text-gray-600 line-clamp-3">
            {hotel.description}
            </p>
            
          <div className="text-green-500 text-sm font-medium  max-w-[80px] text-right">
            {hotel?.price}
          </div>

        
        </div>

        <a
          href={`https://www.google.com/maps/search/?api=1&query=${hotel?.hotelName},${hotel?.address}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 bg-blue-500 hover:bg-blue-600 text-white text-center py-2 rounded-full font-semibold transition-colors"
        >
          CHECK AVAILABILITY
        </a>
      </div>
    </div>
  );
}

export default HotelCardItems
