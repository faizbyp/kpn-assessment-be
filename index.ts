import express from "express";
import dotenv from "dotenv";
dotenv.config({
  path: `./.env.${process.env.NODE_ENV}`,
});
import os from "os";
import https from "https";
import path from "path";
import cors, { CorsOptions } from "cors";
import cookieParser from "cookie-parser";
import fs from "fs";
import { origins as whitelist } from "@/config/allowedOrigins";
import { credentials } from "./middleware/credential";
import router from "./routes";
const app = express();
const servOption = {
  cert: fs.readFileSync("./ssl/cert.pem"),
  key: fs.readFileSync("./ssl/key.pem"),
};

const corsOption: CorsOptions = {
  origin: function (req, callback) {
    if (req && whitelist.indexOf(req) !== -1) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD", "DELETE", "PATCH"],
  credentials: true,
  exposedHeaders: ["set-cookie"],
};

app.use(credentials);
app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(router);
app.use(express.static(path.join(__dirname, "public/build")));
app.get("/*$", (req, res) => {
  res.sendFile(path.join(__dirname, "public/build", "index.html"));
});

// app.listen(process.env.PORT as unknown as number, "0.0.0.0", () => {
//   console.log(`App running on ${process.env.PORT}`);
// });

const server = https.createServer(servOption, app).listen(process.env.PORT, () => {
  console.log(`App running on ${process.env.PORT}`);
});
