
const express= require("express")
const app=express()
const pokemon =require("./models/pokemon.json")



app.get("/",(req,res)=>{
    res.send("Welcome 99 Pokemon")
})

app.get("/bugs", (req,res)=>{
    res.send(`
    <div>
    <p>99 little bugs in the code</p>
    <a href="/bugs/101>Pull one down, patch it around</a>
    </div>`)
})

app.get("/bugs/:numberOfBugs", (req,res)=>{
   
    const {numberOfBugs}=req.params
    if (Number(numberOfBugs)>=200){
        res.send(`
        <div>
       <h1>${numberOfBugs} little bugs in the code</h1>
       <a href="/bugs/101">Too many bugs!! Start over!</a>
        </div>`)

    }

    else{
        res.send(`
        <div>
       <h1>${numberOfBugs} little bugs in the code</h1>
       <a href="/bugs/${Number(numberOfBugs)+2}">Pull one down, patch it around</a>
        </div>
        
        `
        
        )
    }
})

app.get("/pokemon",(req,res)=>{
    res.send(pokemon)
})

app.get("/pokemon/search",(req,res)=>{
    const {name}=req.query
    const match=pokemon.find(pok=>pok.name.toLowerCase()===name.toLowerCase())

    res.send(match||[])
})

app.get("/pokemon/:index",(req,res)=>{
    const {index}=req.params
const poke=pokemon[index]
res.send(poke||`Sorry, no pokemon found at ${index}`)

})

app.get("/:verb/:adj/:noun",(req,res)=>{
const {verb,adj,noun}=req.params
res.send(
    `Congratulations on starting a new project called ${verb}-${adj}-${noun}!`
)
})


module.exports=app