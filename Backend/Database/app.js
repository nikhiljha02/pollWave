import cookieParser from "cookie-parser";
import express from "express";
import authRoute from "../routes/routes.js";
import cors from "cors";

// init Express
const app = express();
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "https://poll-wave-psi.vercel.app",
    credentials: true,
  }),
);
app.use("/auth", authRoute);
app.use("/poll", authRoute);

app.use((err, req, res, next) => {
  if (err.isOPerational) {
    return res
      .status(err.statusCode || 500)
      .json(err.toJSON ? err.toJSON() : { message: err.message });
  }
  res.status(500).json({ message: "Internal Server Error" });
});

export default app;
