const express = require("express");
const http = require("http");
const app = express();
const product = require("./api/product");
const cors = require("cors");
const bodyParser = require("body-parser");
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);


app.use(express.json({ extended: false }));
app.use(cors());

app.use("/api/product", product);
app.use("/",  (req, res) => {
    res.send("Hello World");
} );



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