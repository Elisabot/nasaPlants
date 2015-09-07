var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');



var app = express();



app.use(express.static("static"));
app.use(bodyParser.urlencoded({ extended: true}));


app.get('/', function (req, res) {
	res.send('hello cosmos');
})

app.post('/post-plant', function (req, res) {
	res.json(req.body);
	// res.send('work in progress');
})


// app.get('/plant-form', function(req, res) {
// 	res.send('plant-form.html');
// }) 

app.listen(3000);

console.log("hey")