const express = require("express");
require('dotenv').config();
const pokemon = require("./models/pokemon.json");
const PORT = process.env.PORT;
const app = express();
const basic_css = "<style>h1{color:red}body{backgroundcolor:gray}a{cursor: pointer;}div{border: 2px dotted greenyellow;box-shadow: 5px 5px cadetblue;margin: 10px;padding: 20px;}li{margin: 5px;padding: 10px;}</style>";


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

app.get("/pokemon",( q, s ) =>{
  s.send(pokemon);
})

app.get("/pokemon/search",( q, s ) =>{
  for(let el of pokemon){
    let _ret = undefined;
    for(let x in q.query)
    {

      /////////
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

app.get("/pokemon/:indexOfArray",( q, s ) =>{
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

app.get("/:verb/:adjective/:noun",( q, s ) =>{
  const { verb, adjective, noun } = q.params;
  s.send(`Congratulations on starting a new project called ${verb}-${adjective}-${noun}!`);
})

app.get("/pokemon-pretty",( q, s ) =>{
  s.send(`${basic_css}${pokemon.map(el=>`<div>${recurtive_c(el)}</div>`).join("")}`);
  // s.send(createHTML_json(recurtive_c(pokemon),null));
})

app.listen(PORT, ()=> {
  console.log(`listening on port ${PORT}`)
})

module.exports = app;

function recurtive_c(json)
{
  let ret = "";
  for(let x in json)
  {
    if(typeof json[x]==="object")
    {
      ret+=`<h4>${x}</h4><li>${(recurtive_c(json[x]))}</li>`;
    }
    else
    {
      if(Array.isArray(json))
      {
        ret+=`<p><span>${json[x]}</span></p>`;
      }
      else
      {
        switch(x)
        {
          case "img":
            ret+=`<img src="${json[x]}"/>`;
          break;
          default:
            ret+=`<p><strong>${x}:</strong> <span>${json[x]}</span></p>`;
        }
      } 
    }
  }
  return ret;
}
