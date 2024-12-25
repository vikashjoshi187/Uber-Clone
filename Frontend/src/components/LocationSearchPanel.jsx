import React from "react";

const LocationSearchPanel = ({
  suggestions,
  setPanelOpen,
  setVehiclePanelOpen,
  setPickup,
  setDestination,
  activeField,
}) => {
  const handelSuggestionClick = (suggestion) => {
    if (activeField == "pickup") {
      setPickup(suggestion);
    } else if (activeField == "destination") {
      setDestination(suggestion);
    }
  };
  return (
    <div>
      {suggestions.map((elem, idx) => {
        return (
          <div
            onClick={() => {
              handelSuggestionClick(elem.description);
            }}
            key={idx}
            className="flex gap-4  my-2  border-2 border-gray-50 active:border-black p-3 rounded-xl items-center justify-start"
          >
            <h2 className="bg-[#eee] h-8 w-12 rounded-full flex items-center justify-center">
              <i className="ri-map-pin-fill"></i>
            </h2>
            <h4 className="font-medium">{elem.description}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default LocationSearchPanel;
