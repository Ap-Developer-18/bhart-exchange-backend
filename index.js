import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import AuthRoute from "./routes/auth.route.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

const port = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_CONN)
  .then(() => console.log("✅ Database connected"))
  .catch((err) => console.log("❌ Connection failed:", err));

app.use("/api/auth", AuthRoute);

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
