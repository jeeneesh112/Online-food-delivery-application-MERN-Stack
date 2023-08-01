const express = require("express");
const dotenv = require("dotenv");
const cors= require('cors')
const bodyParser = require('body-parser')

const connectDB = require("./config/config");
require("colors");
const morgan = require("morgan");

//config dotenv
dotenv.config();

//connection mongodb
connectDB();

const app = express();

//middlewares
app.use(express.json());
app.use(morgan("dev"));

app.use(cors())
// parse application/json
app.use(bodyParser.json())


 app.use("/api/pizzas", require("./routes/pizzaRoute"));
 app.use("/api/users", require("./routes/userRoute"));
 app.use('/api/orders', require('./routes/orderRoute'))

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(
    `Server Running On ${process.env.NODE_ENV} mode on port no ${process.env.PORT}`
      .bgMagenta.white
  );
});