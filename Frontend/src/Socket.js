import { io } from "socket.io-client";

const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || "https://pollwave-0qpi.onrender.com";

export const socket = io(BACKEND_URL, {
  withCredentials: true,
  autoConnect: false,
});
