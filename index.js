require("dotenv").config();

const express = require("express");

const server = express();

server.use(express.json());




server.listen(
    process.env.PORT || 8000,
    () => console.log("Server is running...")
);