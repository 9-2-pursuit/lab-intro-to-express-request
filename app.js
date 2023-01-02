const express = require("express");

const app = express();
const pokemon = require("./models/pokemon.json");

app.get("/", (req, res) => {
    res.send("Welcome 99 Pokemon")
});

app.get("/bugs", (req, res) => {
    res.send(`
    <h1>99 little bugs in the code</h1>
    <a href="/bugs/101" >Pull one down, patch it around</a>
    `)
})

app.get("/bugs/:numberOfBugs", (req, res) => {
    const bugs = req.params.numberOfBugs;
    if(bugs >= 200){
        res.send(`<a>Too many bugs!! Start over!</a>`)
    }
    res.send(`
        ${bugs} little bugs in the code
        <a href="/bugs/${+bugs+2}" >Pull one down, patch it around</a>
    `)
})

app.get("/pokemon", (req, res) => {
    res.send(pokemon);
})

app.get("/pokemon/search", (req, res) => {
    const search = req.query;

    res.send(pokemon.find(poke => poke.name.toLowerCase() === search.name.toLowerCase() ) || []);
})

app.get("/pokemon/:indexOfArray", (req, res) => {
    const index = req.params.indexOfArray;

    res.send(pokemon[index] || `Sorry, no pokemon found at ${index}`);
})

app.get("/run/runny/runner", (req, res) => {
    res.send("Congratulations on starting a new project called run-runny-runner!")
})

module.exports = app;