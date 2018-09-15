var express = require("express");
var app = express();

var mysql = require("mysql");
var methodOverride = require('method-override');
var path = require("path");
var bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

app.use(methodOverride('_method'));

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "password",
	database: "friendfinder_db"
});

app.use(express.static('app'));

app.get('/', function(req, res){
	res.sendFile(path.join(__dirname, 'app/public/index.html'));
});

app.get('/survey', function(req, res){
	res.sendFile(path.join(__dirname, 'app/public/index.html'));
});

app.get('/questions', function(req,res){
	connection.query('SELECT * FROM questions', function(error, results){
		res.json(results);
	});
});

app.get('/users', function(req,res){
	connection.query('SELECT * FROM users', function(error, results){
		res.json(results);
	});
});

app.post('/add-answers', function(req, res){
	connection.query('INSERT INTO users SET name = ?, picture = ?, answers = ?',
		[req.body.name, req.body.picture, JSON.stringify(req.body.answers)],
		function(error, results){
			if(error) throw error;

			console.log('answers logged!');
			res.redirect('/friend');
		});
});

app.get('/friend', function(req, res){
	res.sendFile(path.join(__dirname, 'app/public/index.html'));
});

app.listen(3000, function(){
	console.log('listening on port 3000');
});