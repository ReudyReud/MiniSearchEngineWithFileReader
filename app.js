var express = require("express");
var app = express();
var request = require("request");
var bodyParser = require("body-parser");
const fs = require('fs');
const loadJsonFile = require('load-json-file');

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", function(req, res){ //defines path
    res.render("home"); //name of ejs file 
});

app.get("/result", function(req, res){
   res.render("result.ejs"); 
});

app.get("/window", function(req, res){
   res.render("window.ejs"); 
});
app.get("/screen", function(req, res){
   res.render("screen.ejs"); 
});
app.get("/location", function(req, res){
   res.render("location.ejs"); 
});

app.get("/GeoLocation", function(req, res){
   res.render("GeoLocation.ejs"); 
});

app.get("/Navigator", function(req, res){
   res.render("Navigator.ejs"); 
});


app.get("/aboutReud", function(req, res){
   res.render("aboutReud.ejs"); 
});
app.get("/aboutTosh", function(req, res){
   res.render("aboutTosh.ejs"); 
});
app.get("/file", function(req, res){
//    fs.readFile('./views/student.json', (err, data) => {  //Works when file is in same directory
//     if (err) throw err;
//     let student = JSON.parse(data);
//     console.log(student);
//  });
   res.render("fileUpload.ejs"); 
});

app.post("/file", urlencodedParser, function(req, res){ //POST route
   var theFile = req.body.fileName; //Gets Filename from module
   // console.log(theFile); 
   
   res.render("fileUpload.ejs"); 
});

app.post("/fileRes", function(req, res){
 
   res.render("fileResult.ejs"); 
});


app.get("/GoogleSearch", function(req, res){
   res.render("GoogleSearch.ejs"); 
});



app.get("/GoogleResult", function(req, res){
   var url = "https://www.googleapis.com/customsearch/v1?q=";
   var query = req.query.search; 
   var cxAndKey = "&cx=001693825727215715886%3Apwmfzi_u8qc&key=AIzaSyAmEzaYKyDKyojYDwu1kR6HMDQZbDN4Yco";
   request(url + query + cxAndKey ,
      function(error,response, body){
         if(!error && response.statusCode == 200){
         var data = JSON.parse(body);
         res.render("GoogleResult.ejs", {data: data});
         }
      })
   
});


app.listen(process.env.PORT, process.env.IP, function(){ //starts server
    console.log("Server has started"); 
});