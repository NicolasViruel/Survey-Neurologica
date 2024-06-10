const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.search(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
//configure HEADER HTTP - CORS
app.use(cors());

//configuramos las routes
const route = require("../Server/router/index");


app.use('/api', route);


//iniciamos el llamado
const port = process.env.PORT || 5000;
app.listen(port);

console.log("App is listening on port 🎪 " + port);