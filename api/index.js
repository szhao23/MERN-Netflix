// Express used for Backend
const express = require("express");

// Create Application
const app = express();

// Set Up DotEnv variables
const dotenv = require("dotenv");
dotenv.config();

// MongoDB Connection
const mongoose = require("mongoose");

// Routes
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const movieRoute = require("./routes/movies");
const listRoute = require("./routes/list");

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connection Successful."))
  .catch((err) => console.log(err));

// use Express to accept json files
app.use(express.json());

// Setting EndPoints for API
app.use("/api/auth", authRoute); // Login and Register
app.use("/api/users", userRoute); // Get Users, Get User Stats
app.use("/api/movies", movieRoute); // Get Movies and Series
app.use("/api/lists", listRoute); // Get Lists

// In package.json, change "test" script to "start": "nodemon index.js"
// Run yarn start to check to see if the Backend Server is started.

app.listen(8800, () => {
  console.log("Backend Server is Running!!!");
});
