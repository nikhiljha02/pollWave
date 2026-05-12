import express from "express";
import app from "./Database/app.js";
import connectDB from "./Database/db.js";

let PORT = process.env.PORT;

const start = async () => {
  app.listen(PORT || 5000, async () => {
    await connectDB();
    console.log(`server running on ${PORT}`);
  });
};

start().catch((err) => {
  console.error(`failed to start server`, err);
  process.exit(1);
});
