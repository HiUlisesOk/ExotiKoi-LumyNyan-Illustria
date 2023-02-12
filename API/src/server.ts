import express from "express";
import userRoute from "./Routes/UserRoutes";
const app = express();
app.use(express.json()); // middelware que transforma la req.body a un json
