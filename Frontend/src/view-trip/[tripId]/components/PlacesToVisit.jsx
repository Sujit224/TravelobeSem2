import React, { useRef, useState, useEffect } from 'react';
import { FaClock, FaCarSide, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import PlaceAccordionItem from './PlaceAccordionItem';

function Itinerary({ trip }) {
  const itinerary = trip?.tripData?.travelPlan?.itinerary || {};

  const orderedDays = Object.keys(itinerary).sort((a, b) => {
    const dayNumA = parseInt(a.replace('day', ''), 10);
    const dayNumB = parseInt(b.replace('day', ''), 10);
    return dayNumA - dayNumB;
  });

  const dayRefs = orderedDays.reduce((acc, day) => {
    acc[day] = useRef(null);
    return acc;
  }, {});

  const [activeDay, setActiveDay] = useState(orderedDays[0]);
  const [hasScrolled, setHasScrolled] = useState(false);

  // Scroll to day section
  const scrollToDay = (day) => {
    dayRefs[day]?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Scroll Spy: Track active day on scroll
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 100);

      orderedDays.forEach((day) => {
        const section = dayRefs[day]?.current;
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveDay(day);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [orderedDays, dayRefs]);

  return (
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="font-bold text-3xl mt-5 mb-8 flex items-center text-blue-600">🗓️ Day-wise Itinerary</h2>

      {/* Sticky Day Selector */}
      <div className={`sticky top-0 z-50 bg-white py-4 flex gap-4 mb-8 border-b transition-shadow ${hasScrolled ? 'shadow-md' : ''}`}>
        {orderedDays.map((day, index) => (
          <button
            key={day}
            onClick={() => scrollToDay(day)}
            className={`py-2 px-4 rounded-full border font-medium transition-colors ${
              activeDay === day ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-100'
            }`}
          >
            Day {index + 1}
          </button>
        ))}
      </div>

      {/* All Days Visible */}
      {orderedDays.map((day, index) => (
        <div key={day} ref={dayRefs[day]} className="mb-16 scroll-mt-28">
          <h3 className="font-semibold text-2xl mb-6 text-gray-700">{`Day ${index + 1}`}</h3>

          <div className="flex flex-col gap-6">
            {itinerary[day].map((place, idx) => (
              <PlaceAccordionItem key={idx} idx={idx} place={place} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// function AccordionCard({ idx, place }) {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div className="border border-gray-300 rounded-xl shadow-sm overflow-hidden transition-shadow hover:shadow-lg">
//       <div
//         className="flex justify-between items-center cursor-pointer p-4 bg-gray-100 hover:bg-gray-200 transition-colors"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         <div className="flex items-center gap-4">
//           <div className="bg-blue-600 text-white w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold">
//             {idx + 1}
//           </div>
//           <h2 className="font-semibold text-lg text-gray-800">{place?.placeName}</h2>
//         </div>
//         {isOpen ? <FaChevronUp /> : <FaChevronDown />}
//       </div>

//       {isOpen && (
//         <div className="p-4 space-y-4 bg-white animate-fade-in">
//           <img
//             src="/placeHolder.jpg"
//             alt={place?.placeName}
//             className="w-full h-64 object-cover rounded-lg"
//           />
//           <p className="text-gray-600 text-sm">{place?.details}</p>

//           <div className="flex flex-wrap text-gray-500 text-sm gap-4">
//             <div className="flex items-center">
//               <FaClock className="mr-1 text-blue-500" />
//               {place?.bestTime}
//             </div>
//             <div className="flex items-center">
//               <FaCarSide className="mr-1 text-pink-500" />
//               {place?.timeTravel}
//             </div>
//           </div>

//           <p className="text-green-600 font-semibold text-lg">{place?.ticketPricing}</p>

//           <a
//             href={`https://www.google.com/maps/search/?api=1&query=${place?.geoCoordinates.latitude},${place?.geoCoordinates.longitude}`}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="inline-block bg-blue-500 hover:bg-blue-600 text-white text-center py-2 px-4 rounded-full font-medium transition-colors"
//           >
//             View in Google Maps
//           </a>
//         </div>
//       )}
//     </div>
//   );
// }

export default Itinerary;
