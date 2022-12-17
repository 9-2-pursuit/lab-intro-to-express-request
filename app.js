const express = require("express");
const pokemon = require("./models/pokemon.json");

const app = express();

app.get("/:verb/:adjective/:noun", (req, res) => {
  res.send(
    `Congratulations on starting a new project called ${req.params.verb}-${req.params.adjective}-${req.params.noun}!`
  );
});

app.get("/", (req, res) => {
  res.send("Welcome 99 Pokemon");
});

app.get("/bugs", (req, res) => {
  res.send(
    '<h1>99 little bugs in the code</h1> <br/><a href="/bugs/101">pull one down, patch it around</a>'
  );
});

app.get("/bugs/:numberOfBugs", (req, res) => {
  const { numberOfBugs } = req.params;

  if (`${Number(numberOfBugs)}` >= 200) {
    res.send(
      `${req.params.numberOfBugs} little bugs in the code <br/><a href="/bugs">Too many bugs!! Start over!</a>`
    );
  } else {
    res.send(
      `${req.params.numberOfBugs} little bugs in the code <br/><a href="/bugs/${
        Number(numberOfBugs) + 2
      }">Pull one down, patch it around</a>`
    );
  }
});

app.get("/pokemon", (req, res) => {
  res.send(pokemon);
});

app.get("/pokemon/search", (req, res) => {
  const { name } = req.query;
  const foundPokemon = pokemon.filter(
    (poke) => poke.name.toLowerCase() === name.toLowerCase()
  );
  res.send(foundPokemon[0] ? foundPokemon[0] : []);
});

app.get("/pokemon/:index", (req, res) => {
  res.send(
    pokemon[Number(req.params.index)]
      ? pokemon[Number(req.params.index)]
      : `Sorry, no pokemon found at ${req.params.index}`
  );
});

module.exports = app;
