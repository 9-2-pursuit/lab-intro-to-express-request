
const express = require('express')
const app = express()

const pokemon = require("./models/pokemon.json");


var port = process.env.PORT || 3000;


app.get("/", (req, res) => {
    res.send("Welcome 99 Pokemon");
  });


app.get('/pokemon', (req, res) => {
    res.send(pokemon)
  })
  
  app.get("/pokemon/search", (req,res) => {
      const { name } = req.query;
    
  const pokeOBJ = pokemon.find((poke) =>  (poke.name).toLowerCase() === name.toLowerCase());

  console.log(pokeOBJ)
  pokeOBJ ? res.send(pokeOBJ) : res.send([]);

  })
  
  app.get("/pokemon/:indexOfArray", (req,res) => {
      const { indexOfArray } = req.params;
      const pokem = pokemon[indexOfArray];
      pokem ? res.send(pokemon[indexOfArray]) : res.send(`Sorry, no pokemon found at ${indexOfArray}`)
  })


  app.get("/bugs/:numberOfBugs", (req, res) => {
    const { numberOfBugs } = req.params
    numberOfBugs<200 ? res.send(`<h1>${numberOfBugs} little bugs in the code</h1><a href=/bugs/:${Number(numberOfBugs)+2}>Pull one down, patch it around
    </a>`) : res.send(`<a href=/bugs>Too many bugs!! Start over!</a>`)

  });

  app.get("/bugs", (req, res) => {
    res.send(`<h1>99 little bugs in the code</h1><a href=/bugs/:101}>pull one down, patch it around</a>`)
    
      });


app.get('/:verb/:adjective/:noun', (req, res) => {
    const { verb,adjective,noun } = req.params
  res.send(`Congratulations on starting a new project called ${verb}-${adjective}-${noun}!`)
})



module.exports = app;

