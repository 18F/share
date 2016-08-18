'use strict';

var express = require('express');
var hbs = require('hbs');
var bodyParser = require("body-parser");

var app = express();

app.set('view engine', 'html');
app.engine("html", hbs.__express);
app.use(bodyParser.urlencoded({extended: true}));
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/static'));

app.get("/",function(req, res) {
	res.render('index',
	{
		peers:{
				peer1: "hello",
				peer2: false
			},
		hi: 

	});
});

app.get("/:unique_id", function(req, res){
	res.render("index",
		{
			peers:{
					peer1: false,
					peer2: 100
				}
		});
})

var server = app.listen(8080, function() {
	console.log('Listening on '+8080)
});

app.use('/peerjs', require('peer').ExpressPeerServer(server, {
	debug: true
}));