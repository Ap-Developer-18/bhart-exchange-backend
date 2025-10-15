import express from "express";
import cors from "cors"; // ✅ add this line
import dotenv from "dotenv";
import mongoose from "mongoose";
import AuthRoute from "./routes/auth.route.js";

dotenv.config();
const app = express();

app.use(express.json());

// ✅ Enable CORS
app.use(
  cors({
    origin: "*", // allow all origins
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Our server is running at", port);
});

// ✅ Database connection
mongoose
  .connect(process.env.MONGODB_CONN)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("Connection failed", err));

// ✅ Routes
app.use("/api/auth", AuthRoute);
