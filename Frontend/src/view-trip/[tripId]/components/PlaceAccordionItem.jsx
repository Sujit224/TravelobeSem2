import React, { useEffect, useState } from 'react';
import { FaClock, FaCarSide, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalAPI';

function PlaceAccordionItem({ idx, place }) {
  const [isOpen, setIsOpen] = useState(false);
  const [imgUrl, setImgUrl] = useState('');

  useEffect(() => {
    if (place?.placeName) {
      fetchPlacePhoto();
    }
  }, [place]);

  const fetchPlacePhoto = async () => {
    const data = { textQuery: place.placeName };
    try {
      const resp = await GetPlaceDetails(data);
      const photoRef = resp.data?.places?.[0]?.photos?.[3]?.name;
      if (photoRef) {
        setImgUrl(PHOTO_REF_URL.replace('{NAME}', photoRef));
      }
    } catch (error) {
      console.error('Failed to fetch place photo:', error);
    }
  };

  return (
    <div className="border border-gray-300 rounded-xl shadow-sm overflow-hidden transition-shadow hover:shadow-lg">
      <div
        className="flex justify-between items-center cursor-pointer p-4 bg-gray-100 hover:bg-gray-200 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-4">
          <div className="bg-blue-600 text-white w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold">
            {idx + 1}
          </div>
          <h2 className="font-semibold text-lg text-gray-800">{place?.placeName}</h2>
        </div>
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </div>

      {isOpen && (
        <div className="p-4 space-y-4 bg-white animate-fade-in">
          <img
            src={imgUrl || '/placeHolder.jpg'}
            alt={place?.placeName}
            className="w-full h-64 object-cover rounded-lg"
          />
          <p className="text-gray-600 text-sm">{place?.placeDetails}</p>

          <div className="flex flex-wrap text-gray-500 text-sm gap-4">
            <div className="flex items-center">
              <FaClock className="mr-1 text-blue-500" />
              {place?.bestTime}
            </div>
            <div className="flex items-center">
              <FaCarSide className="mr-1 text-pink-500" />
              {place?.timeTravel}
            </div>
          </div>

          <p className="text-green-600 font-semibold text-lg">{place?.ticketPricing}</p>

          <a
            href={`https://www.google.com/maps/search/?api=1&query=${place?.geoCoordinates.latitude},${place?.geoCoordinates.longitude}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white text-center py-2 px-4 rounded-full font-medium transition-colors"
          >
            View in Google Maps
          </a>
        </div>
      )}
    </div>
  );
}

export default PlaceAccordionItem;
