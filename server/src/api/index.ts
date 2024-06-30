import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import loginRoute from "../routes/loginRoute";
import dataRoute from "../routes/data.routes";
import { greet } from "../controllers/loginRedirect";
dotenv.config();

const server = express();
server.use(cors());
server.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: true,
  })
);
server.use(express.json());

//ROUTES
server.use("/", loginRoute);
server.use("/api", dataRoute);
server.get("/api/greet", greet);
server.listen(3001, () => {
  console.log("Server Listening...");
});
