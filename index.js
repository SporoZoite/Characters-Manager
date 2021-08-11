const express = require("express");
const app = express();
const characters = require("./characters.json");

app.get("/characters", (req, res) => {
  res.status(200).json(characters);
});

app.listen(8080, () => {
  console.log("I am ready!");
});
