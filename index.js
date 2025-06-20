require("dotenv-expand").expand(require("dotenv").config());
require("./config/envirement");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const fs = require("fs");
const path = require("path");


const studentRouter = require("./routers/studentRouter");
const app = express();
const server = http.createServer(app);










server.listen(ENV.APP_PORT, () => {
  console.log(`🚀 Server running on port: ${ENV.APP_PORT}`);
});


const whitelist = ["http://localhost:3000"];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));


app.use(express.json({ limit: "5mb" }));


mongoose.set("strictQuery", false);
mongoose.Promise = global.Promise;

mongoose.connect(ENV.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}, (err) => {
  if (err) {
    return console.error("❌ MongoDB connection error:", err);
  }
  console.log("✅ Connected to MongoDB");
});

global.Models = require("./models/");

app.use("/rh/student", studentRouter);


const files = fs.readdirSync("./routers");
for (const file of files) {
  if (file !== "studentRouter.js") {
    const pathRouter = "/rh/" + file.substr(0, file.indexOf("Router"));
    app.use(pathRouter, require("./routers/" + file));
  }
}
