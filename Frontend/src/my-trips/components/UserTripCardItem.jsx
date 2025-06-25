import React from "react";
import { useState } from "react";
import { GetPlaceDetails } from "@/service/GlobalAPI";
import { PHOTO_REF_URL } from "@/service/GlobalAPI";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function UserTripCardItem({ trip }) {
  const [imgUrl, setImgUrl] = useState();
  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.location?.label,
    };
    const result = await GetPlaceDetails(data).then((resp) => {
      console.log(resp.data);

      const PhotoUrl = PHOTO_REF_URL.replace(
        "{NAME}",
        resp.data.places[0].photos[3].name
      );
      setImgUrl(PhotoUrl);
    });
  };
  return (
    <Link to={'/view-trip/'+trip?.id}>
      <div className="hover:scale-105 transition-all ">
        <img src={imgUrl} className="object-cover rounded-xl " />

        <div>
          <h2 className="font-bold text-lg">
            {trip?.userSelection?.location?.label}
          </h2>
          <h2 className="text-sm text-gray-500">
            {trip?.userSelection.noOfDays} days trip with a{" "}
            {trip?.userSelection?.budget} budget
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default UserTripCardItem;
