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
