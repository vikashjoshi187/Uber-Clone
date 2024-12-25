import React from "react";

const RidePopUp = (props) => {
 
  return (
    <div>
      <h5
        className="p-1 text-center  w-[90%]  absolute top-0"
        onClick={() => {
          props.setRidePopupPanel(false);
        }}
      >
        {" "}
        <i className="ri-arrow-down-wide-line text-gray-400 text-3xl"></i>{" "}
      </h5>
      <h3 className="text-2xl font-semibold mb-5">New Ride Avilable</h3>
      <div className="flex items-center justify-between p-3 bg-yellow-400   rounded-lg mt-4">
        <div className="flex items-center gap-3 ">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src="https://cdn2.psychologytoday.com/assets/styles/manual_crop_1_1_1200x1200/public/field_blog_entry_images/2018-09/shutterstock_648907024.jpg?itok=1-9sfjwH"
            alt=""
          />
          <h4 className="text-lg font-medium">{props.ride?.user.fullname.firstname +" " + props.ride?.user.fullname.lastname}</h4>
        </div>
        <h5 className="text-lg font-semibold">2.2 km </h5>
      </div>
      <div className="w-full mt-5">
        <div className="flex items-center gap-5 p-3 border-b-2">
          <i className=" text-lg ri-map-pin-2-fill"></i>
          <div>
            <h3 className="text-lg font-medium">562/11-A</h3>
            <p className="text-sm -mt-1 text-gray-600">
             {props.ride?.pickup}
            </p>
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
      <div>
        <div className="flex mt-5 w-full items-center justify-between">
          <button
            className="  bg-green-600 text-white font-semibold p-3 px-10 rounded-lg"
            type="button"
            onClick={() => {
              // setRidePopupPanel(false)
              props.setConfirmRidePopupPanel(true);
              props.confirmRide()
            }}
          >
            Accept
          </button>

          <button
            className="bg-gray-300 text-gray-700 font-semibold p-3 px-10 rounded-lg"
            type="button"
            onClick={() => {
              props.setRidePopupPanel(false);
            }}
          >
            Ignore
          </button>
        </div>
      </div>
    </div>
  );
};

export default RidePopUp;
