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
    origin: ["http://localhost:5173", "http://10.173.47.62:5173"],
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
  console.error(err);
  res.status(500).json({ message: "Internal Server Error" });
});

export default app;
