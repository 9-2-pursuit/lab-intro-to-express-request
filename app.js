const express = require("express");
const pokemon = require("./models/pokemon.json");

const app = express();

app.get("/", (req, res) => {
  res.send("Welcome 99 Pokemon");
});

app.get("/:key1/:key2/:key3", (req, res) => {
  console.log(req.params);
  const { key1, key2, key3 } = req.params;
  res.send(
    `Congratulations on starting a new project called ${key1}-${key2}-${key3}!`
  );
});

app.get("/bugs", (req, res) => {
  res.send(
    `<div><span>99 little bugs in the code </span><a href="/bugs/101">Pull one down, patch it around</a></div>`
  );
});

app.get("/bugs/:numberOfBugs", (req, res) => {
  const { numberOfBugs } = req.params;

  let link = `<a href="/bugs/${
    Number(numberOfBugs) + 2
  }">Pull one down, patch it around</a>`;

  if (Number(numberOfBugs) >= 200) {
    link = `<a href="/bugs">Too many bugs!! Start over!</a>`;
  }

  res.send(`
    <div><span>${numberOfBugs} little bugs in the code </span>
    ${link}
    </div>
    `);
});

app.get("/pokemon", (req, res) => {
  res.send(pokemon);
});

app.get("/pokemon/search", (req, res) => {
  const { name } = req.query;

  const matchingPoke =
    pokemon.find((poke) => poke.name.toLowerCase() === name.toLowerCase()) ||
    [];

  res.send(matchingPoke);
});

app.get("/pokemon/:pokeIndex", (req, res) => {
  const { pokeIndex } = req.params;
  const singlePoke =
    pokemon[pokeIndex] || `Sorry, no pokemon found at ${pokeIndex}`;
  res.send(singlePoke);
});

app.get("/pokemon-pretty", (req, res) => {
  res.send(`<ul>
      
  ${pokemon
    .map(
      (poke, idx) => `<li>
  <a href ="/pokemon-pretty/${idx}">${poke.name}</a>
  </li>`
    )
    .join("")}
  
      </ul>`);
});

app.get("/pokemon-pretty/:pokeIndex", (req, res) => {
  const { pokeIndex } = req.params;
  const singlePoke = pokemon[pokeIndex];

  const html = `<div>
      <h2>
      ${singlePoke.name}
      </h2>
      <img src="${singlePoke.img}"/>
  <span>
  ${singlePoke.type}
  </span>
  <table>
  <thead>
  <tr>
  <td>
  Stat
  </td>
  <td>
  Value
  </td>
  </tr>
  </thead>
  <tbody>
  ${Object.keys(singlePoke.stats).map(
    (key) => `<tr>
  <td> ${key}</td>
  <td></td>
  </tr>`
  )}
  </tbody>
  </table>
  
      </div>`;
});

module.exports = app;
