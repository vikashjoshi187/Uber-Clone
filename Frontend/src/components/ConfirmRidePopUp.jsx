import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const ConfirmRidePopUp = (props) => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/rides/start-ride`,
      {
        params: {
          rideId: props.ride?._id,
          otp: otp.toString(),
        },

        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    if (response.status == 200) {
      props.setConfirmRidePopupPanel(false);
      props.setRidePopupPanel(false);

      navigate("/captain-riding",{state:{ride:props.ride}});
    }
  };
  return (
    <div>
      <h5
        className="p-1 text-center  w-[90%]  absolute top-0"
        onClick={() => {
          props.setConfirmRidePopupPanel(false);
        }}
      >
        {" "}
        <i className="ri-arrow-down-wide-line text-gray-400 text-3xl"></i>{" "}
      </h5>
      <h3 className="text-2xl font-semibold mb-5">
        Confirm this ride to start
      </h3>
      <div className="flex items-center justify-between p-3 bg-yellow-400   rounded-lg mt-4">
        <div className="flex items-center gap-3 ">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src="https://cdn2.psychologytoday.com/assets/styles/manual_crop_1_1_1200x1200/public/field_blog_entry_images/2018-09/shutterstock_648907024.jpg?itok=1-9sfjwH"
            alt=""
          />
          <h4 className="text-lg font-medium capitalize">
            {props.ride?.user.fullname.firstname +
              " " +
              props.ride?.user.fullname.lastname}
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
        <form onSubmit={submitHandler}>
          <input
            value={otp}
            onChange={(e) => {
              setOtp(e.target.value);
            }}
            type="number"
            className="bg-[#eee] px-6 py-4 text-lg font-mono rounded-lg w-full mt-3"
            placeholder="Enter OTP"
          />

          <button
            className="w-full block text-center text-lg mt-3 bg-green-600 text-white font-semibold p-3 rounded-lg"
            type="submit"
          >
            Confirm
          </button>
          <button
            className="w-full mt-3 text-lg bg-red-500 text-white font-semibold p-3 rounded-lg"
            type="button"
            onClick={() => {
              props.setConfirmRidePopupPanel(false);
              props.setRidePopupPanel(false);
            }}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default ConfirmRidePopUp;
