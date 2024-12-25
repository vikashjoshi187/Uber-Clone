import React from "react";

const VehiclePanel = ({fare,setVehiclePanelOpen,setConfirmRidePanel,setVehicleType}) => {

   
  // setVehiclePanelOpen remove if not needed
  return (
    <div>
      <h5
        className="p-1 text-center w-[90%]   absolute top-0"
        onClick={() => {
          setVehiclePanelOpen(false);
        }}
      >
        <i className="ri-arrow-down-wide-line text-gray-400 text-3xl"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Choose a Vehicle</h3>

      <div onClick={()=>{
        setVehiclePanelOpen(false)
        setConfirmRidePanel(true)
        setVehicleType("car")
      }} className="flex p-3 mb-2 border-2 active:border-black rounded-xl items-center justify-between w-full ">
        <img
          className="h-12"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_638/v1682350114/assets/c2/296eac-574a-4a81-a787-8a0387970755/original/UberBlackXL.png"
          alt=""
        />
        <div className="w-1/2 ml-2">
          <h4 className="font-medium test-base ">
            UberGO{" "}
            <span>
              <i className="ri-user-fill"></i>4
            </span>
          </h4>
          <h5 className="text-sm">2 min away</h5>
          <p className="font-normal text-xs text-gray-600">
            Affodable compact rides
          </p>
        </div>
        <h2 className="text-lg font-semibold">${fare.car}</h2>
      </div>

      <div onClick={()=>{
        setVehiclePanelOpen(false)
        setConfirmRidePanel(true)
        setVehicleType("motorcycle")
      }}
       className="flex p-3 mb-2 border-2 active:border-black rounded-xl items-center justify-between w-full ">
        <img
          className="h-12"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
          alt=""
        />
        <div className="w-1/2 ml-2">
          <h4 className="font-medium test-base ">
            Moto{" "}
            <span>
              <i className="ri-user-fill"></i>1
            </span>
          </h4>
          <h5 className="text-sm">3 min away</h5>
          <p className="font-normal text-xs text-gray-600">
            Affodable Motocycle rides
          </p>
        </div>
        <h2 className="text-lg font-semibold">${fare.motorcycle}</h2>
      </div>

      <div onClick={()=>{
        setVehiclePanelOpen(false)
        setConfirmRidePanel(true)
        setVehicleType("auto")
      }} className="flex p-3 mb-2 border-2 active:border-black rounded-xl items-center justify-between w-full ">
        <img
          className="h-12"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
          alt=""
        />
        <div className="w-1/2 ml-2">
          <h4 className="font-medium test-base ">
            Uber Auto{" "}
            <span>
              <i className="ri-user-fill"></i>4
            </span>
          </h4>
          <h5 className="text-sm">2 min away</h5>
          <p className="font-normal text-xs text-gray-600">
            Affodable auto rides
          </p>
        </div>
        <h2 className="text-lg font-semibold">${fare.auto}</h2>
      </div>
    </div>
  );
};

export default VehiclePanel;
