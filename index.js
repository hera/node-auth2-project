require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const usersRouter = require("./api/users/usersRouter");
const authRouter = require("./api/auth/authRouter");

const server = express();

server.use(helmet());
server.use(express.json());


server.use("/api/users", usersRouter);
server.use("/api/auth", authRouter);


server.listen(
    process.env.PORT || 8000,
    () => console.log("Server is running...")
);