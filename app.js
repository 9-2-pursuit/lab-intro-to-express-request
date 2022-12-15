const express = require("express");
require('dotenv').config();
const pokemon = require("./models/pokemon.json");
const PORT = process.env.PORT;
const app = express();


app.get("/", (req, res) => {
  //
  res.send("Welcome 99 Pokemon");
});

// console.log(pokemon[0]);

app.listen(PORT, ()=> {
  // console.log(`listening on port ${PORT}`)
})