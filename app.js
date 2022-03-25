const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const productRoute = require("./routes/products");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("db connected successfully"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use('/api/auth',authRoute);
app.use('/api/user',userRoute);
app.use('/api/products',productRoute);


module.exports = app;
