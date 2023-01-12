
// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();
/* Middleware*/
const bodyParser = require("body-Parser")
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
//parse application/json
app.use(bodyParser.json());

// Cors for cross origin allowance
const Cors = require("cors");
//enable all cors required
app.use(Cors());

// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Initialize the main project folder
app.use(express.static('website'));

//callback function to complete get all
let getMost = (req,res) => res.status(200).send(projectData);
//get route
app.get("/all",getMost);

//callback function to complete post add
let postInf = (req,res) => {
    projectData = req.body;
    console.log(projectData);
    res.status(200).send(projectData);
}
//post route
app.post("/add",postInf);
const port = 4000;
let hostname = "127.0.0.1";

//function to test server
let testing = () =>
console.log(`server running at http://${hostname}:${port}`);
// spin up the server
app.listen(port,testing);


// GET route
app.get('/getRequest',getData);
// Callback function to complete GET '/all'  
function getData (req,res){
 //   console.log("Get Data "+projectData)
    res.send(projectData);
}

// Post Route
app.post('/temp',temp);
// Callback function to complete post '/postData'
function temp(req,res){
    projectData={
        temp:req.body.temp,
        city:req.body.city,
        date:req.body.date,
        content:req.body.content
    }
    //projectData.push(req.body);
    res.send(projectData);
}
