import express from "express";
const app = express(),
  port = 3000;

app
  .get("/", (req, res) => res.json({ message: "success" }))
  .listen(port, () => console.log(`server is listening at ${port}`));
