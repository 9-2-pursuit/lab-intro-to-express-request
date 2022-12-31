// import ==> require
// export ==> module.exports
const express = require("express");
const pokemonsList = require("./models/pokemon.json");
const app = express();
// RUTAS: Son todas aquellas URLS / Endpoints que definimos para que los clientes WEB puedan solicitar informacion

// TEST 1
app.get("/", (req, res) => {
  // res.send ==> enviar texto plano
  res.send("Welcome 99 Pokemon");
});

// TEST 2
app.get("/bugs", (req, res) => {
  res.contentType("html");
  res.send(
    `
        <h1>99 little bugs in the code</h1>
        <a href="/bugs/101">pull one down, patch it around</a>
      `
  );
});

// TEST 3
app.get("/bugs/:numberOfBugs", (req, res) => {
  const numberOfBugs = Number(req.params.numberOfBugs);
  const nextNumberOfBugs = numberOfBugs + 2;

  /* /bugs/:numberOfBugs/:type/:issueId
   * req.params = {
   *  numberOfBugs: 101,
   *  type: 'Warning',
   *  issueId: 'AK-091-V'
   * }
   *
   *
   */

  res.contentType("html");
  numberOfBugs < 200
    ? res.send(
        `
              <h1>${numberOfBugs} little bugs in the code</h1>
              <a href="/bugs/${nextNumberOfBugs}">Pull one down, patch it around</a>
        `
      )
    : res.send(
        `
              <a href="/bugs">Too many bugs!! Start over!</a>
        `
      );
});

// ==============================================================================================================
// POKEMONS TESTS
// ==============================================================================================================


//Ruta 1
app.get("/pokemon", (req, res) => {
  res.json(pokemonsList);
}); 

app.get("/pokemon/search", (req, res) => {
  const pokemonName = req.query.name;
  const pokemonFound = pokemonsList.find(
    (pokemon) => pokemonName?.toLowerCase() === pokemon.name.toLowerCase()
  );

  res.json(pokemonFound ?? []);
  // ?? evalua si lo que esta a la izquierda es i
});

//ruta 2
app.get("/pokemon/:indexOfArray", (req, res) => {
  const pokemonsLength = pokemonsList.length - 1;
  const indexOfArray = Math.round(Number(req.params.indexOfArray));

  // indexOfArray debe pertenecer al rango de indices del array de los pokemones
  // indexOfArray sea un numero entero => /pokemon/55.987
  if (indexOfArray > pokemonsLength) {
    res.send(`Sorry, no pokemon found at ${indexOfArray}`);
    return;
  }

  res.json(pokemonsList[indexOfArray]);
});


// ULTIMO TEST (?)
app.get("/:verb/:adjective/:noun", (req, res) => {
  const verb = req.params.verb;
  const adjective = req.params.adjective;
  const noun = req.params.noun;
  res.send(`Congratulations on starting a new project called ${verb}-${adjective}-${noun}!`);
 // "Congratulations on starting a new project called run-runny-runner!";
})


// Inicializar la escucha de nuestra aplicacion para que pueda comenzar a recibir y responder peticiones
app.listen(3000, () =>
  console.log("Nuestra aplicacion se ejecuta correctamente")
);

// node ./app.js

module.exports = app;
