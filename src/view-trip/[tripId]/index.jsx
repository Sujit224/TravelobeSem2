import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import InfoSetion from './components/InfoSetion';
import Hotels from './components/Hotels';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';
import PlacesToVisit from './components/PlacesToVisit';
import Itinerary from './components/PlacesToVisit';


function Viewtrip() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (tripId) {
      GetTripData();
    }
  }, [tripId]);

  const GetTripData = async () => {
    try {
      const docRef = doc(db, 'AITrips', tripId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document:", docSnap.data());
        setTrip(docSnap.data());
      } else {
        console.log("No such document");
        // Optional: Add toast here
      }
    } catch (error) {
      console.error("Error fetching document: ", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className='p-10 text-center text-lg'>Loading Trip...</div>;
  }

  if (!trip) {
    return <div className='p-10 text-center text-lg'>Trip not found.</div>;
  }

  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
      {/* Information Section */}
        <InfoSetion trip={trip} />
      {/* Recommended Hotels */}
        <Hotels trip={trip}/>
      {/* Daily Plan */}
        <Itinerary trip={trip}/>
      {/* Footer */}
    </div>
  );
}

export default Viewtrip;
