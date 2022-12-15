const express = require("express");

const app = express();

app.get("/:verb/:adjective/:noun", (req, res) => {
  const { verb, adjective, noun } = req.params;
  res.send(
    `Congratulations on starting a new project called ${req.params.verb} ${req.params.adjective} ${req.params.noun} `
  );
});

module.exports = app;
