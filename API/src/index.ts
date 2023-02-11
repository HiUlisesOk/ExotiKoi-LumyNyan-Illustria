import express from "express";

const app = express();
app.use(express.json()); // middelware que transforma la req.body a un json

const PORT = 3000;

app.get("/ping", (_req, res) => {
  console.log("Hello! It's time to PING PONG!");
  res.status(200).send("PONG!");
});

app.listen(PORT, () => {
  console.log("Server has started on port: " + PORT);
});
