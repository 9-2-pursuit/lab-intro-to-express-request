// DEPENDENCIES
const express = require("express");
const pokemon = require("./models/pokemon.json");
console.log(pokemon[0]);

// CONFIGURATION
const app = express();
const PORT = process.env.PORT;

// ROUTES
app.get("/", (req, res) => {
  res.send("Welcome 99 Pokemon");
});

app.get("/:verb/:adj/:noun", (req, res) => {
  console.table(req.params.verb);
  const { verb, adj, noun } = req.params;
  res.send(
    `Congratulations on starting a new project called ${verb}-${adj}-${noun}!`
  );
});

// - On the home page (`get "/bugs"`), users should see:
//   - "99 little bugs in the code"
//   - a link that says "pull one down, patch it around"
//   - this should link to `/bugs/101`, where the number represents the number of bugs remaining to fix
// - When a number is given in the url (`get "/bugs/:numberOfBugs"`), users should see:
//   - The number of bugs left in the code (i.e. `101 little bugs in the code`)
//   - a link to "pull one down, patch it around", where the href is number of bottles in the parameter plus 2
// - If there over 200 bugs left, do not show a link to "pull one down", rather, add a link to start over, which directs the user back to the home page

app.get("/bugs", (req, res) => {
  res.send(
    "99 little bugs in the code <br><a href='/bugs/101'>pull one down, patch it around</a>"
  );
});

app.get("/bugs/:num", (req, res) => {
  const { num } = req.params;
  if (Number(num) >= 200) {
    res.send('<a href="/bugs">Too many bugs!! Start over!</a>');
  }
  res.send(
    `${num} little bugs in the code <br> <a href=/bugs/${
      Number(num) + 2
    }>Pull one down, patch it around</a>`
  );
});

// - make a route `/pokemon` that will show a list of all the pokemon
// - make a route `/pokemon/:indexOfArray` that returns 1 pokemon at that array position
//   - if the array position is invalid or there is no pokemon at that position, instead send `sorry, no pokemon found at indexOfArray` - where `indexOfArray` is the value from the URL that the user has entered
// - make a route /pokemon/search - where a user can add a query parameter
//   such as http://localhost:8888/pokemon/search?name=oddish

//   which will respond with an empty object if no pokemon was found, or with the pokemon's info -

app.get("/pokemon", (req, res) => {
  res.send(pokemon);
});

app.get("/pokemon/search", (req, res) => {
  console.log(req.query);
  res.send(
    pokemon.find(
      (monster) => req.query.name.toLowerCase() === monster.name.toLowerCase()
    ) || []
  );
});

app.get("/pokemon/:indexOfArray", (req, res) => {
  const { indexOfArray } = req.params;
  res.send(
    pokemon[indexOfArray] || `Sorry, no pokemon found at ${indexOfArray}`
  );
});

// sends an empty array when the Pokemon isn't found (3 ms)
//       ✕ sends the Pokemon when the name exactly matches (2 ms)
//       ✕ sends the Pokemon when the name matches ignoring case (2 ms)

// LISTEN
// app.listen(PORT, () => {
//   console.log(`listening on port ${PORT}`);
// });

// EXPORT
module.exports = app;
