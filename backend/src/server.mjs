import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import env from "./environment.mjs";
import webRoutes from "./routes/web.mjs";


mongoose
  .connect(env.getMongoUriString())
  .then(() => console.log("Connected to mongo"))
  .catch(() => console.log("Not connected"));  

const app = express();

// CORS
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); //LINE 5

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', false);

  // Pass to next layer of middleware
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(webRoutes);
app.listen(env.APP_PORT, () => console.log(`Running on ${env.APP_PORT}`));

