import React from "react";
import { Link } from "react-router-dom";
const Start = () => {
  return (
    <div className=" bg-cover bg-bottom  bg-[url(https://miro.medium.com/v2/resize:fit:1200/1*-hrOoWNhJl6Cjl5ZUFvnNA.png)] h-screen pt-5  flex justify-between flex-col w-full bg-red-400">
      <img  className="w-16 ml-8" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png" alt="" />
      <div className="bg-white pb-7 py-4 px-4">
        <h2 className="text-[30px] font-bold">Get started with Uber</h2>
        <Link to={"/login"} className=" flex items-center justify-center  w-full bg-black text-white py-3 rounded-lg mt-5">Continue</Link>
      </div>
    </div>
  );
};

export default Start;
