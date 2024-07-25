import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import loginRoute from "../routes/loginRoute";
import dataRoute from "../routes/data.routes";
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
server.listen(3000,'0.0.0.0', () => {
  console.log(`Server Listening  ...`);
});
