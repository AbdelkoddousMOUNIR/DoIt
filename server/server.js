const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const AuthRoutes = require("./routes/AuthRoutes.js")
const UserRoutes = require("./routes/UserRoutes.js")
const TasksRoutes = require('./routes/TaskRoutes.js')
const cookieParser = require("cookie-parser");


const app = express();
// Add the cookie-parser middleware
app.use(cookieParser());

app.use(cors({
    origin: true,
    credentials: true,
  }));
app.use(express.json());

app.use("/auth", AuthRoutes)
app.use('/tasks' , TasksRoutes)
app.use('/user' , UserRoutes)

//set up mongoDB
require("dotenv").config()

mongoose.connect(process.env.DataBaseURL, {
    useNewUrlParser: true,
    useUnifiedTopology : true,
}).then(app.listen(process.env.Port,
    () => { console.log(`listning ${process.env.Port}`) }))
    .catch((error) => { console.log(error.message) })