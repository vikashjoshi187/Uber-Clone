import React, { useContext } from "react";
import { CaptainDataContext } from "../context/CaptainContext";
const CaptainDetails = () => {
  const {captain} = useContext(CaptainDataContext);
  // {captain.fullname.firstname}
  return (
    <div className="z-20">
      {" "}
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start gap-3">
          <img
            className="h-10 w-10 rounded-full"
            src="https://files.prokerala.com/news/photos/imgs/1024/apple-previews-upcoming-emojis-on-world-emoji-day-1035806.jpg"
            alt=""
          />
          <h4 className="text-lg font-medium capitalize">{captain.fullname.firstname +" " +captain.fullname.lastname}</h4>
        </div>
        <div>
          <h4 className="text-xl font-semibold">Rs 204.65</h4>
          <p className="'text-sm text-gray-600">Earned</p>
        </div>
      </div>
      <div className="flex  p-3 mt-8 bg-gray-100 rounded-xl justify-center gap-5 items-start">
        <div className="text-center">
          <i className="text-3xl mb-2 font-extralight ri-time-line"></i>
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>

        <div className="text-center">
          <i className="text-3xl mb-2 font-extralight ri-speed-up-line"></i>
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>

        <div className="text-center">
          <i className="text-3xl mb-2 font-extralight ri-booklet-line"></i>
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
      </div>
    </div>
  );
};

export default CaptainDetails;
