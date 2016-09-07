'use strict';

var express = require('express');
var hbs = require('hbs');
var bodyParser = require("body-parser");
var cfenv = require("cfenv");
var app = express();

var appEnv = cfenv.getAppEnv();
//deploy to cloud.gov or cloud foundry
var server = app.listen(appEnv.port);
//deploy locally
//var server = app.listen(8080);
var io = require('socket.io').listen(server);
var fs = require("fs");


app.set('view engine', 'html');
app.engine("html", hbs.__express);
app.use(bodyParser.urlencoded({extended: true}));
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/static'));

app.get("/",function(req, res) {
	res.render('index', {
		peers: {
			first: true,
			second: false
		}
	});
});

app.get("/receiver/:unique_id", function(req, res){
	res.render("index",
		{
			peers:{
					peer1: false,
					peer2: true
				}
		});
})

io.on("connection", function(socket){
	socket.on("send", function(data){
		console.trace(data);
		socket.emit("sendToPeer", fs.readFileSync(data));
	});
	socket.on("receive", function(data){
		fs.writeFileSync("received_file", data);
	})
})

app.use('/peerjs', require('peer').ExpressPeerServer(server, {
	debug: true
}));
