import express from "express";
import bodyParser from "body-parser";
import { mongoConnect } from './services/mongoose.js';

mongoConnect();

import dotenv from "dotenv";
dotenv.config();

const app = express();
const appPort = process.env.PORT;

app.use(bodyParser.json());

import { initializeRoutes } from "./services/expressRoutes.js";
initializeRoutes(app);

app.listen(appPort, () => {
    console.log(`Example app listening on port ${appPort}`);
});
