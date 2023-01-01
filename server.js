//DEPENDENCIES FOR DOTENV
const app = require("./app.js");

//CONFIGURATION //configure the dotenv package. calling the config function to access environmental variables... port
require("dotenv").config();
const PORT = process.env.PORT;

//LISTEN
app.listen(PORT, () => {
    console.log(`listening on port ${PORT} 💎`)
})