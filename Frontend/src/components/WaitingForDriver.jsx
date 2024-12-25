import React from "react";

const WaitingForDriver = (props) => {
  return (
    <div>
      <h5
        className="p-1 text-center  w-[90%]  absolute top-0"
        onClick={() => {
          props.setWaitingForDriver(false);
        }}
      >
        {" "}
        <i className="ri-arrow-down-wide-line text-gray-400 text-3xl"></i>{" "}
      </h5>

      <h3 className="text-2xl font-semibold mb-5">Waiting for a driver</h3>

      <div className="flex  justify-between items-center p-2">
        <img
          className="h-12"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_638/v1682350114/assets/c2/296eac-574a-4a81-a787-8a0387970755/original/UberBlackXL.png"
          alt=""
        />
        <div className="text-right">
          <h2 className="tewxt-lg font-medium capitalize">
            {props.ride?.captain.fullname.firstname +
              " " +
              props.ride?.captain.fullname.lastname}
          </h2>
          <h4 className="text-xl font-semibold -mt-1 -mb-1">{props.ride?.captain.vehicle.plate}</h4>
          <p className="text-sm text-gray-600">Maruti Suzuki Aulto </p>
          <h1 className="test-lg font-semibold">{props.ride?.otp}</h1>
        </div>
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
    </div>
  );
};

export default WaitingForDriver;
