const express = require("express");
const app = express();
const product = require("./api/product");
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(express.json({ extended: false }));
app.use(cors());

app.use("/api/product", product);
app.use("/",  (req, res) => {
    res.send("Hello World");
} );

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));