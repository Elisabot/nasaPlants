var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

// config
var port = 3000;
var dburl = 'mongodb://localhost:27017/mycooldb';


var app = express();
var db = null;
var nasaPlants = null;

app.use(express.static("static"));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());


// app.get('/', function (req, res) {
// 	res.send('hello cosmos');
// })


//Create
app.post('/post-plant', function (req, res) {
	
	nasaPlants.insert(req.body, function (err, inserted) {
		if (err) { throw err };
		res.send('plant added!')
	});
	// res.send('work in progress');
})

//Read
app.post('/plant-query', function (req, res) {
	console.log(req.body);

	nasaPlants.find({
		climate : {
			$in: req.body.climate
		},
		lighting : {
			$in: req.body.light
		}
	}).toArray( function (err, matchingPlants) {

		res.send(matchingPlants)

	});

	

})


// app.get('/plant-form', function(req, res) {
// 	res.send('plant-form.html');
// }) 

MongoClient.connect(dburl, function (err, dbconnection) {
	if (err) { throw err };
	
	console.log("connected to database at", dburl);
	db = dbconnection;
	nasaPlants = db.collection('nasaPlants');
	app.listen(port, function () {
		console.log("server listening on port", port);
	});

})
