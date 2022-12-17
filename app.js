const express = require("express")

const app = express()

app.get("/:verb/:adjective/:noun", (req, res) => {
    res.send(`Congratulations on starting a new project called ${req.params.verb}-${req.params.adjective}-${req.params.noun}!`)
})

app.get("/", (req, res) => {
    res.send("Welcome 99 Pokemon")
})

app.get("/bugs", (req, res) => {
    res.send('<h1>99 little bugs in the code</h1> <br/><a href="/bugs/101">pull one down, patch it around</a>')
})

app.get("/bugs/:numberOfBugs", (req, res) => {
    const { numberOfBugs } = req.params;
    
    if (`${Number(numberOfBugs)}` >= 200) {
        res.send(`${req.params.numberOfBugs} little bugs in the code <br/><a href="/bugs">Too many bugs!! Start over!</a>`)
    } else {
        res.send(`${req.params.numberOfBugs} little bugs in the code <br/><a href="/bugs/${Number(numberOfBugs) + 2}">Pull one down, patch it around</a>`)
    }
})

module.exports = app