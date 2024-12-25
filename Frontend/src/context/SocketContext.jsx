import React, { createContext, useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";

// Create SocketContext
export const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

const socket = io(`${import.meta.env.VITE_BASE_URL}`);
const SocketProvider = ({ children }) => {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to socket server", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from socket server");
    });

    // Cleanup on component unmount
    // return () => {
    //   socket.disconnect();
    // };
  }, []);

  // Function to send a message to a specific event name
  const sendMessage = (eventName, data) => {
    socket.emit(eventName, data);
  };

  // Function to listen for a message from a specific event name
  const reciveMessage = (eventName, callback) => {
    socket.on(eventName, callback);
  };

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
