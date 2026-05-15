import app from "./Database/app.js";
import connectDB from "./Database/db.js";
import http from "http";
import { Server } from "socket.io";

let PORT = process.env.PORT || 5000;

// 1. Create HTTP server
const server = http.createServer(app);

// 2. Attach socket to same server
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://10.173.47.62:5173"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

let polls = {};

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("joinPoll", (pollId) => {
    socket.join(pollId);
  });

  socket.on("vote", ({ pollId, optionId }) => {
    if (!polls[pollId]) polls[pollId] = {};

    polls[pollId][optionId] = (polls[pollId][optionId] || 0) + 1;

    console.log(polls);

    io.to(pollId).emit("pollUpdate", polls[pollId]);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// 3. Start DB then server
const start = async () => {
  try {
    await connectDB();

    server.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  } catch (err) {
    console.error("failed to start server", err);
    process.exit(1);
  }
};

start();
