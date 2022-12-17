const express = require("express");
const pokemon = require("./models/pokemon.json");
const app = express();

//Routes
app.get("/", (req, res) => {
    res.send("Welcome 99 Pokemon")
})

app.get("/bugs", (req, res) => {
    res.send("99 little bugs in the code <br/><a href='/bugs/101'>pull one down, patch it around</a>")
})


app.get("/bugs/:numberOfBugs", (req, res) => {
    const {numberOfBugs} = req.params 

    // console.log(numberOfBugs)

   

    if(numberOfBugs >= 200)
    {
        res.send("<a href='/bugs'>Too many bugs!! Start over!</a>");
    } else {
        //------------⬇️ changes dynamically in the url
        res.send(`${req.params.numberOfBugs} little bugs in the code<a href="/bugs/${Number(numberOfBugs) + 2}">Pull one down, patch it around</a>`)
    }
})

app.get("/pokemon", (req, res) => {
    res.send(pokemon)
})

app.get("/pokemon/search", (req, res) => {
    const {name} = req.query;
  const filteredName =  pokemon.filter((poke) => {
    return poke.name.toLowerCase() === name.toLowerCase()
  })
    if(filteredName[0]){
        res.send(filteredName[0])
    } else {
        res.send([])
    }
})

app.get("/pokemon/:indexOfArray", (req, res) => {
    const {indexOfArray} = req.params
    if(pokemon[indexOfArray]) {
        res.send(pokemon[Number(indexOfArray)])
    } else {
        res.send(`Sorry, no pokemon found at ${indexOfArray}`)
    }
})

app.get("/:verb/:adjective/:noun", (req, res) => {
    res.send(`Congratulations on starting a new project called ${req.params.verb}-${req.params.adjective}-${req.params.noun}!`)
})
  
// console.log(pokemon[0]);

module.exports = app

