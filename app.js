//Get Express
const express = require("express");

//Config
const app = express();

// New Project Name Generator
//Routes
app.get("/:verb/:adjective/:noun", (req, res) => {
    const { verb, adjective, noun } = req.params;
    res.send(
      `Congratulations on starting a new project called ${verb}-${adjective}-${noun}!`
    );
  });
  
  // 99 Little Bugs In the Code
  //Routes
  app.get("/bugs", (req, res) => {
    res.send(
      `<h1>99 little bugs in the code</h1> <a href="/bugs/101">Pull one down, patch it around</a>`
    );
  });

// Decrementing the Bugs
//Routes
app.get("/bugs/:numberOfBugs", (req, res) => {
    //Destructuring Assignment
    const {numberOfBugs} = req.params
    //Switch statement for value but If statement is pref for binary
    if (numberOfBugs < 200) {
        res.send(
          `<h1>${numberOfBugs} little bugs in the code</h1>
            <a href=/bugs/${+numberOfBugs + 2}>Pull one down, patch it around</a>`
        );
      } else if (numberOfBugs === 200) {
        res.send(
            `<h1>${numberOfBugs} little bugs in the code</h1>
              <a href=/bugs/${+numberOfBugs + 2}>Pull one down, patch it around</a>`
          );
      } else {
        res.send("<a href=/bugs>Too many bugs!! Start over!</a>");
      }
    });

    //Welcome message
    //Routes
    app.get("/", (req, res) => {
        res.send("Welcome 99 Pokemon");
      });

      // Poke-Express Gotta Catch em ALLLLLL! RIP ASH
      //Routes
    
      const pokemon = require("./models/pokemon.json");

      app.get("/pokemon", (req, res) => {
        res.json(pokemon);
      });

      app.get("/pokemon/search", (req, res) => {
        const { name } = req.query;
        console.log(name);
        const searchpokedex = pokemon.filter(
          (el) => el.name.toLocaleLowerCase() === name.toLowerCase()
        );
        console.log(searchpokedex);
        if (searchpokedex.length > 0) {
            res.json(searchpokedex[0]);
          } else {
            res.json(searchpokedex);
          }
      });
      
      app.get("/pokemon/:indexOfArray", (req, res) => {
        const { indexOfArray } = req.params;
        if (pokemon[indexOfArray]) {
          res.send(pokemon[indexOfArray]);
        } else {
          res.send(`Sorry, no pokemon found at ${indexOfArray}`);
        }
      });
``

      //Export the app
    module.exports = app;