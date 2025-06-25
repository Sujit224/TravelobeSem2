  import React from 'react';

  import { Link } from 'react-router-dom';
  import HotelCardItems from './HotelCardItems';



  function Hotels({ trip }) {
    
    const hotels = trip?.tripData?.travelPlan?.hotels || [];

    return (
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="font-bold text-2xl mt-5 mb-6 flex items-center">
          🏨 Hotel Recommendations
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hotels.map((hotel, index) => (
            <HotelCardItems hotel={hotel} key={index}/>
          ))}
        </div>
      </div>
    );
  }

  export default Hotels;
