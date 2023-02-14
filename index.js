import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connectDB from "./mongodb/connect.js";
import { postRoutes, dalleRoutes, chatRoutes } from "./routes/index.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use("/api/v1/post", postRoutes);
app.use("/api/v1/dalle", dalleRoutes);
app.use("/api/v1/chat", chatRoutes);

app.get("/", async (req, res) => {
  res.send("Hello World");
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URI);
    app.listen(8000, () => console.log("Server is running on port 8000"));
  } catch (error) {
    console.log(error);
  }
};

startServer();
