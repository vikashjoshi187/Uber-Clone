import { useGSAP } from "@gsap/React";
import gsap from "gsap";
import React, { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import FinishRide from "../components/FinishRide";

const CaptainRiding = () => {
  const [finishRidePanel, setFinishRidePanel] = useState(false);
  const finishRidePanelRef = useRef(null);
  const location = useLocation();
  const rideData = location.state?.ride;

  useGSAP(
    function () {
      if (finishRidePanel) {
        gsap.to(finishRidePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(finishRidePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [finishRidePanel]
  );

  return (
    <div className="h-screen relative ">
      <h5
        className="p-1 text-center  w-[90%]  absolute top-0"
        onClick={() => {}}
      >
        {" "}
        <i className="ri-arrow-down-wide-line text-gray-400 text-3xl"></i>{" "}
      </h5>
      <div className="fixed p-6 top-0 flex items-center justify-between w-screen">
        <img
          className="w-16"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png"
          alt="Uber"
        />
        <Link
          to={"/captain-home"}
          className="h-10  w-10 bg-white flex items-center justify-center rounded-full"
        >
          <i className="text-lg ri-logout-box-r-line"></i>
        </Link>
      </div>

      <div className="h-4/5">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>

      <div
        className="h-1/5  flex items-center justify-between bg-yellow-400 relative"
        onClick={() => {
          setFinishRidePanel(true);
        }}
      >
        <h5
          className="p-1 text-center  w-screen absolute top-0"
          onClick={() => {}}
        >
          <i className="ri-arrow-up-wide-line  text-yellow-600 text-3xl"></i>
        </h5>

        <h4 className="text-xl font-semibold ms-6">4 KM away</h4>
        <button className=" me-6  bg-green-600 text-white font-semibold p-3 px-10 rounded-lg">
          Complete ride
        </button>
      </div>

      <div
        ref={finishRidePanelRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white  py-10 px-3 pt-12"
      >
        <FinishRide
         ride={rideData}
        setFinishRidePanel={setFinishRidePanel} />
      </div>
    </div>
  );
};

export default CaptainRiding;
