import express from "express";
import bodyParser from "body-parser";
import auth from "../server/auth.js";

import cors from "cors";
const app = express();

import dbConnect from "../server/db/dbConnect.js";

import userRoutes from "./routes/userRoutes.js";
import loginRoute from "./routes/loginRoute.js";

import adminRoutes from "./routes/adminRoutes.js";

import User from "../server/db/userModel.js";

dbConnect();

// body parser configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: true, credentials: true }));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use("/", userRoutes);
app.use("/user/:id", userRoutes);
app.use("/register", userRoutes);

app.use("/login", loginRoute);

app.use("/signup", userRoutes);
app.use("/login", userRoutes);

app.use("/admins", userRoutes);
app.use("/admin/:id", userRoutes);

app.get("/free-endpoint", (req, res) => {
  response.json({ message: "you are free to access this endpoint" });
});

app.get("/auth-endpoint", auth, (req, res) => {
  response.json({ message: "You are authenticated to access this endpoint" });
});

app.listen(8000, () => {
  console.log("Server listening on port 8000");
});
