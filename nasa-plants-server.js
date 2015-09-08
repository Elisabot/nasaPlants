var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

// config
var port = 3000;
var dburl = 'mongodb://localhost:27017/mycooldb';


var app = express();
var db = null;


app.use(express.static("static"));
app.use(bodyParser.urlencoded({ extended: true}));


app.get('/', function (req, res) {
	res.send('hello cosmos');
})

app.post('/post-plant', function (req, res) {
	var nasaPlants = db.collection('nasaPlants');
	nasaPlants.insert(req.body, function (err, inserted) {
		if (err) { throw err };
		res.send('plant added!')
	});
	// res.send('work in progress');
})


// app.get('/plant-form', function(req, res) {
// 	res.send('plant-form.html');
// }) 

MongoClient.connect(dburl, function (err, dbcollection) {
	if (err) { throw err };
	
	console.log("connected to database at", dburl);
	db = dbcollection;
	app.listen(port, function () {
		console.log("server listening on port", port);
	});

})