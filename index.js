import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import AuthRoute from "./routes/auth.route.js";

dotenv.config();
const app = express();
app.use(express.json());

const port = process.env.PORT;

app.listen(port, () => {
  console.log("our server is runing at", port);
});

// database connection

mongoose
  .connect(process.env.MONGODB_CONN)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => console.log("connection failed", err));

//  router
app.use("/api/auth", AuthRoute);
