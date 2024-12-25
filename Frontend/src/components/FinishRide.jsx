import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const FinishRide = (props) => {
  const navigate = useNavigate();
  const endRide = async () => {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/end-ride`,
      {
        rideId: props.ride?._id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.status == 200) {
      navigate("/captain-home");
    }
  };
  return (
    <div>
      <h5
        className="p-1 text-center  w-[90%]  absolute top-0"
        onClick={() => {
          props.setFinishRidePanel(false);
        }}
      >
        {" "}
        <i className="ri-arrow-down-wide-line text-gray-400 text-3xl"></i>{" "}
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Finish this ride</h3>
      <div className="flex items-center justify-between p-4 border-2 border-yellow-400   rounded-lg mt-4">
        <div className="flex items-center gap-3 ">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src="https://cdn2.psychologytoday.com/assets/styles/manual_crop_1_1_1200x1200/public/field_blog_entry_images/2018-09/shutterstock_648907024.jpg?itok=1-9sfjwH"
            alt=""
          />
          <h4 className="text-lg font-medium">
            {props.ride?.user.fullname.firstname}
          </h4>
        </div>
        <h5 className="text-lg font-semibold">2.2 km </h5>
      </div>
      <div className="w-full mt-5">
        <div className="flex items-center gap-5 p-3 border-b-2">
          <i className=" text-lg ri-map-pin-2-fill"></i>
          <div>
            <h3 className="text-lg font-medium">562/11-A</h3>
            <p className="text-sm -mt-1 text-gray-600">{props.ride?.pickup}</p>
          </div>
        </div>

        <div className="flex items-center gap-5 p-3 border-b-2">
          <i className="text-lg ri-map-pin-user-fill"></i>
          <div>
            <h3 className="text-lg font-medium">562/11-A</h3>
            <p className="text-sm -mt-1 text-gray-600">
              {props.ride?.destination}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-5 p-3">
          <i className="text-lg  ri-currency-fill"></i>
          <div>
            <h3 className="text-lg font-medium">${props.ride?.fare}</h3>
            <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
          </div>
        </div>
      </div>

      <div className="mt-6 ">
        <button
          onClick={endRide}
          className="w-full block text-lg text-center mt-3 bg-green-600 text-white font-semibold p-3 rounded-lg"
          type="button"
        >
          Finish Ride
        </button>
        <p className="text-gray-500 mt-10 text-xs">
          Click on finsh ride button if you have completed the payment.
        </p>
      </div>
    </div>
  );
};

export default FinishRide;
