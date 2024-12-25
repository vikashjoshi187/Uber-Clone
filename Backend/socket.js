const socketIo = require("socket.io");
const userModel = require("./models/user.model");
const captainModel = require("./models/captain.model");

let io;

function initializeSocket(server) {
  io = socketIo(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`Client connected to ${socket.id}`);

    socket.on("join", async (data) => {
      console.log("In JOIN EVENT",data);

      const { userId, userType } = data;
      if (userType == "user") {
        await userModel.findByIdAndUpdate(userId, {
          socketId: socket.id,
        });
      }
      if (userType == "captain") {
        await captainModel.findByIdAndUpdate(userId, {
          socketId: socket.id,
        });
      }
      console.log(`User ${userId} joined as ${socket.id}`);
    });

    socket.on("update-location-captain", async (data) => {
      const { userId, location } = data;

      if (!location || !location.ltd || !location.lng) {
        return socket.emit("error", { message: "Invalid Location" });
      }

      console.log(`User ${userId} updated loaction at ${location.ltd} ${location.lng}`);

      await captainModel.findByIdAndUpdate(userId, {
        location: {
          ltd: location.ltd,
          lng: location.lng,
        },
      });
    });

    socket.on("disconnect", () => {
      console.log(`Client disconnected : ${socket.id}`);
    });
  });
}
function sendMessageToSocketId(socketId, messageObj) {  
  if (io) {    
    io.to(socketId).emit(messageObj.event, messageObj.data);
  } else {
    console.log("Socket.io not initialized.");
  }
}
module.exports = { initializeSocket, sendMessageToSocketId };
