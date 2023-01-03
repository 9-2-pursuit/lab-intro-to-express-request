const pokemon = require("./models/pokemon.json");
const express = require("express");

const app = express();

// 1st task
app.get("/:verb/:adjective/:noun", (req, res) => {
  const {verb, adjective, noun} = req.params;
  return res.send(`Congratulations on starting a new project called ${verb}-${adjective}-${noun}!`);
});

// 2nd task
app.get('/bugs', (req, res) => {
  return res.send(`<h1>99 little bugs in the code</h1> <a href="/bugs/101">Pull one down, patch it around</a>`);
})

app.get('/bugs/:numberOfBugs', (req, res) => {
  const { numberOfBugs } = req.params
  let msg = `<h1>${numberOfBugs} little bugs in the code</h1> <a href="/bugs/${parseInt(numberOfBugs) + 2}">Pull one down, patch it around</a>`
  if (numberOfBugs >= 200)
    msg = `Too many bugs!! Start over! <a href="/bugs">Start Over</a>`

  return res.send(msg);
})

// 3rd task
app.get("/", (req, res) => res.send("Welcome 99 Pokemon"));
app.get("/pokemon", (req, res) => res.send(pokemon));

app.get("/pokemon/search", (req, res) => {
  const {name} = req.query;
  const items = pokemon.find(i => i.name.toLowerCase().includes(name.toLowerCase()));
  if (!items) return res.send([]);
  res.send(items);
});


app.get("/pokemon/:index", (req, res) => {
  const {index} = req.params;
  const item  = pokemon[index];
  if (!item) return res.send("Sorry, no pokemon found at 9001")
  res.send(item);
});


module.exports = app