require("dotenv").config();
const cors = require("cors");
const express = require("express");
const socket = require("socket.io");
const app = express();
// Applying Cors
app.use(cors());

// JSON formatting
app.use(express.json()); // PARSER JSON

// DataBase Connectivity
const { connectDB } = require("./DataBase/database");

//  Importing Created Router
const auth_route = require("./routers/auth");
const msg_router = require("./routers/message");

app.use("/api/auth", auth_route);
app.use("/api/messages", msg_router);

const server = app.listen(process.env.PORT, () => {
  console.log(`Listening ON port ${process.env.PORT}`);
});

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});


global.onlineUsers = new Map();

io.on("connection",(socket)=>{
    
})