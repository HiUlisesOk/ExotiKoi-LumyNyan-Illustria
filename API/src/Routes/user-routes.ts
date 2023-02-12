import { Router } from "express";

const userRoute = Router();

userRoute.get("/", (req, res) => {
  res.status(200).send("Here are all the users in the db");
});

userRoute.get("/data", (req, res) => {
  res.status(200).send("Here are all the data from one user in the db");
});

userRoute.get("/characters", (req, res) => {
  res.status(200).send("Here are all the data from one user character in the db");
});

export default userRoute;
