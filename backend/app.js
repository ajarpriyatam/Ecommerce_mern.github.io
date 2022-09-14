const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const path = require("path")

if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({ path: "backend/db/config.env" });
  }

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

const product = require("./routes/ProdectRoute");
const user = require("./routes/userRoute");
const order = require("./routes/OrderRoute");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
 });
 
module.exports = app;
