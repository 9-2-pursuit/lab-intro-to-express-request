const express = require("express");
const pokemon = require("./models/pokemon.json");

// console.log(pokemon[0]);
const app = express();

app.get("/", (req, res) => {
  res.send("Welcome 99 Pokemon");
});

app.get("/:verb/:adjective/:noun", (req, res) => {
  const { verb, adjective, noun } = req.params;
  res.send(
    `Congratulations on starting a new project called ${req.params.verb}-${req.params.adjective}-${req.params.noun}!`
  );
});

app.get("/bugs", (req, res) => {
  res.send(
    `99 little bugs in the code <a href= "http://localhost:8888/bugs/101">pull one down patch it around</a>`
  );
});

app.get("/bugs/101", (req, res) => {
  res.send("Number of bugs to fix: 101");
});

app.get("/bugs/:numOfBugs", (req, res) => {
  const numOfBugs = Number(req.params.numOfBugs);
  res.send(
    `${numOfBugs} little bugs in the code <a href= "http://localhost:8888/bugs/:numOfBugs"> pull one down patch it around </a> `
  );
});

app.get("/pokemon", (req, res) => {
  res.send(pokemon);
});

app.get("/pokemon/search", (req, res) => {
  const name = req.query.name;
  //   console.log(req.query.name);
  let pokeName = pokemon.find(
    (poke) => poke.name.toLowerCase() === name.toLowerCase()
  );
  //   console.log(pokeName)

  res.send(pokeName ? pokeName : []);
});

app.get("/pokemon-pretty", (req, res) => {
  const pokeName = pokemon.map((poke) => {
    return poke.name;
  });
  res.send(
    `<ul><a href ="http://localhost:8888/pokemon-pretty/:index">${pokeName}</a><ul>`
  );
});

app.get("/pokemon-pretty/:index", (req, res) => {
  let index = Number(req.params.index);
  let find = pokemon.find((poke, i) => {
    poke === index;
  });
  // console.log(index)
  res.send();
});

app.get("/pokemon/:index", (req, res) => {
  const index = Number(req.params.index);

  if (pokemon[index]) {
    res.send(pokemon[index]);
  } else {
    res.send(`Sorry, no pokemon found at ${index}`);
  }
});

module.exports = app;
