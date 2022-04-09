const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const productRoute = require("./routes/products");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const paymentRoute = require("./routes/stripe");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("db connected successfully"))
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());
app.use('/api/auth',authRoute);
app.use('/api/user',userRoute);
app.use('/api/products',productRoute);
app.use('/api/cart',cartRoute);
app.use('/api/orders',orderRoute);
app.use('/api/checkout',paymentRoute);

module.exports = app;
