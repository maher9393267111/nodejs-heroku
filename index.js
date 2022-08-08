const express = require("express");
const http = require("http");
const app = express();
const product = require("./api/product");
const cors = require("cors");
const bodyParser = require("body-parser");
const server = http.createServer(app);
const socket = require("socket.io");
//const io = socket(server);

const io = socket(server, {
    cors: {
      //  origin: "http://localhost:3000",

        // add more origins here
        origin:{
            "http://localhost:3000": true,
            "pusher-nextjs-seven.vercel.app": true,

        },
     

        methods: ["GET", "POST" , "PUT", "DELETE"],
        credentials: true
    }
})




app.use(express.json({ extended: false }));
app.use(cors());

app.use("/api/product", product);
app.use("/",  (req, res) => {
    res.send("Hello World");
} );


// server usee cors



// Socket.io setup
io.on("connection", socket => {
    console.log("New client connected");
    socket.emit("your id", socket.id);
    socket.on("send message", body => {
        io.emit("message", body)
    })
})



const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`Server is running in port ${PORT}`));