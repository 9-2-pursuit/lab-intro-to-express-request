const express = require("express");
const app = express();
const pokemon = require("./models/pokemon.json");
console.log(pokemon[0]);

app.get("/", (req, res) => {
  res.send("Welcome 99 Pokemon");
});

app.get("/:verb/:adjective/:noun", (req, res) => {
  const params = req.params;
  res.send(
    `Congratulations on starting a new project called ${params.verb}-${params.adjective}-${params.noun}!`
  );
});

app.get("/bugs", (req, res) => {
  res.send(
    `99 little bugs in the code<br />
    99 little bugs<br />
    <a href="/bugs/101">Pull one down</a><br />Patch it around<br />
    101 bugs in the code`
  );
});

app.get("/bugs/:numberOfBugs", (req, res) => {
  const num = req.params.numberOfBugs;
  if (num >= 200) {
    res.send(`<a href="/bugs">Too many bugs!! Start over!</a>`);
  } else {
    res.send(
      `${num} little bugs in the code<br />
        ${num} little bugs<br />
        <a href="/bugs/${
          Number(num) + 2
        }">Pull one down<br />Patch it around<br /></a>
        ${Number(num) + 2} bugs in the code`
    );
  }
});

app.get("/pokemon", (req, res) => {
  res.send(pokemon);
});

app.get("/pokemon/search", (req, res) => {
  const pokeSearch = req.query.name;
  console.log(pokeSearch);

  for (const poke of pokemon) {
    if (poke.name.toLowerCase() === pokeSearch.toLowerCase()) {
      res.send(poke);
    }
  }
  res.send([]);
});

app.get("/pokemon/:indexOfArray", (req, res) => {
  const i = req.params.indexOfArray;
  if (!pokemon[i]) {
    res.send(`Sorry, no pokemon found at ${i}`);
  } else {
    res.send(pokemon[i]);
  }
});

module.exports = app;
