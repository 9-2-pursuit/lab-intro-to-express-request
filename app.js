const express = require("express");
require('dotenv').config();
const pokemon = require("./models/pokemon.json");
const PORT = process.env.PORT;
const app = express();
const basic_css = "<style>h1{color:red}body{backgroundcolor:gray}a{cursor: pointer;}</style>";

app.get("/", (req, res) => {
  //
  res.send("Welcome 99 Pokemon");
});
app.get("/bugs", (req, res) => {
  res.send(`${basic_css}<h1>99 little bugs in the code</h1><a href='/bugs/101'>Pull one down, patch it around</a>`);
});
app.get("/bugs/:numberOfBugs", (req, res) => {
  let res_text = "";

  if(Number(req.params?.numberOfBugs)>199)
  {
    res_text = `${basic_css}<h1>Too many bugs!! Start over!</h1><a href='/bugs'>Start over</a>`;
  }
  else
  {
    res_text = `${basic_css}<h1>${req.params?.numberOfBugs} little bugs in the code</h1><a href="/bugs/${Number(req.params?.numberOfBugs)+2}">Pull one down, patch it around</a>`;
  }
  res.send(res_text);
});

app.get("/pokemon",( q,s ) =>{
  s.send(pokemon);
})

app.get("/pokemon/search",( q, s ) =>{
  for(let el of pokemon){
    let _ret = undefined;
    for(let x in q.query)
    {
      if(el[x]!=undefined && _ret===undefined && (el[x].toLowerCase() === q.query[x].toLowerCase()))
      {
        _ret = true;
      }
      else if(el[x]!=undefined)
      {
        _ret = _ret && (el[x].toLowerCase() === q.query[x].toLowerCase());
      }
    }
    if(_ret) 
    {
      s.send(el);
      return;
    }
  }
  s.send([]);
})

app.get("/pokemon/:indexOfArray",( q,s ) =>{
  const result = pokemon[q.params.indexOfArray];
  if(result)
  {
    s.send(result);
  }
  else
  {
    s.send(`Sorry, no pokemon found at ${q.params.indexOfArray}`)
  }
  
})

app.get("/run/runny/runner",( q,s ) =>{
  s.send("Congratulations on starting a new project called run-runny-runner!");
})


app.listen(PORT, ()=> {
  console.log(`listening on port ${PORT}`)
})

module.exports = app;