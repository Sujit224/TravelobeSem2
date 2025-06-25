import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button';
import { IoIosSend } from "react-icons/io";
import { GetPlaceDetails } from '@/service/GlobalAPI';


 const PHOTO_REF_URL = 'https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key='+import.meta.env.VITE_GOOGLE_PLACE_API_KEY
function InfoSetion({trip}) {

  const [imgUrl,setImgUrl]=useState();
  useEffect(()=>{
    trip&&GetPlacePhoto();
  },[trip])
  
  const GetPlacePhoto=async()=>{
    const data = {
      textQuery:trip?.userSelection?.location?.label
    }
    const result = await GetPlaceDetails(data).then(resp=>{
      console.log(resp.data);

     const  PhotoUrl = PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name);
      setImgUrl(PhotoUrl)
    }) 
  }
  return (
    <div>
      <img
        src={imgUrl}
        className="h-[300px] w-full object-cover rounded-xl"
        alt=""
      />
      <div className='flex justify-between items-center'>
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-bold text-2xl">
            {trip?.userSelection?.location?.label}
          </h2>
          <div className="flex gap-5">
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              📅{trip.userSelection?.noOfDays} Day
            </h2>

            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              💰{trip.userSelection?.budget} Budget
            </h2>

            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              🧑‍🤝‍🧑 No of Traveller{trip.userSelection?.traveller}{" "}
            </h2>
          </div>
        </div>
        <Button><IoIosSend /></Button>
      </div>
    </div>
  );
}

export default InfoSetion
