const express = require("express");
const pokemon = require("./models/pokemon.json");

const app = express();

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

app.get("/pokemon-pretty", (req, res) => {
  res.send(
    "All Pokemon" +
      pokemon
        .map(
          (p, i) =>
            `<ul><li><a href="/pokemon-pretty/${i}">${p.name}</a></li></ul>`
        )
        .join("")
  );
});

app.get("/pokemon-pretty/:indexOfArray", (req, res) => {
  const foundIndex = pokemon[Number(req.params.indexOfArray)];
  if (foundIndex) {
    const { name, img, misc } = foundIndex;
    res.send(
      `<h2>Name: ${name}</h2> <img src = ${img} alt = ${name}/> <h3>Height: ${misc.height}</h3> <h3>Weight: ${misc.weight}</h3>`
    );
  } else {
    res.send(`Sorry, no pokemon found at ${req.params.indexOfArray}`);
  }
});

app.get("/:verb/:adjective/:noun", (req, res) => {
  res.send(
    `Congratulations on starting a new project called ${req.params.verb}-${req.params.adjective}-${req.params.noun}!`
  );
});

module.exports = app;
