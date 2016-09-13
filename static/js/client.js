// This is a very simple code example. See chat.html for a more involved
// example.

/*

The general idea here comes from:
https://github.com/laike9m/peerjs-with-nodewebkit-tutorial

The specific idea is here:
https://www.toptal.com/webrtc/taming-webrtc-with-peerjs - this is super useful

mime types: https://github.com/jshttp/mime-types

*/


var base_url = window.location.protocol + "//" + window.location.hostname;

if (window.location.port != ''){
  base_url += ":"+window.location.port;
}

//var socket_io_on_cloud_gov = window.location.protocol + '//' + window.location.hostname + ":4443" //+ window.location.pathname
//removes trailing "/" on server ^

//locally
window.socket = io.connect(window.location.href);

//cloud.gov server
//window.socket = io.connect(socket_io_on_cloud_gov);

var peer1ID;
var sendProgress = document.querySelector('progress#sendProgress');
var receiveProgress = document.querySelector('progress#receiveProgress');
var downloadAnchor = document.querySelector("a#download");
var receiveBuffer = [];
var receivedSize = 0;
var buffer = [];
var debug = false;

// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
// courtesy of https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}


function generateIds() {

    window.peer1ID = peer1ID = ""+getRandomInt(0,100000); //implicit to string conversion
    peer2ID = ""+getRandomInt(0,100000); //implicit to string conversion
    while(peer2ID === peer1ID){
    	//ensures uniqueness
    	peer2ID = ""+getRandomInt(0,100000);
    }
    
  $("#url_to_share").append(base_url+"/receiver/"+peer1ID+"-"+peer2ID);   
  $("#url_to_share").attr("href",base_url+"/receiver/"+peer1ID+"-"+peer2ID);
}

function sendData(){
  peer1 = new Peer(peer1ID,{  
        host: location.hostname,
        //port: 4443, //on server
        port: location.port || (location.protocol === "https:" ? 443 : 80), //locally
        path: '/peerjs',
        debug: 3});

  var fileInput = document.querySelector('input#fileInput');
  var file = fileInput.files[0];
  var reader = new window.FileReader();
  
  var conn = peer1.connect(peer2ID);
  if (debug){alert("connected to peer2");}
  conn.on("open", function(){
    if (debug){alert("connection started on connection open");}
    console.log("logging transfer");
    conn.send(file);
    peer1.disconnect();
  });

  /*conn.on("close", function(){

  });*/
  window.conn = conn;
  window.file = file;
  window.reader = reader;
  //window.file_content = file_content;  
}

function receiveData(){
  url = window.location.pathname;
  peer2ID = url.split("-")[1];
    
  if (debug){alert("about to create peer2");}
  peer2 = new Peer(peer2ID,{ 
      host: location.hostname,
      //port: 4443, //on server
      port: location.port || (location.protocol === "https:" ? 443 : 80), //locally
      path: '/peerjs',
      debug: 3});

  if (debug) {alert("peer2 created");}
  peer2.on("connection", function(conn){
    if (debug) {alert("connection established");}
    conn.on("data", function(data){
      download(data);
    });
    
  });

  if (debug){alert("data added to global scope");}
  //puts buffer in global state
  window.buffer = buffer;
  window.peer2 = peer2;
  peer2.on("close", function(){
    if (debug){alert("connection closed");}
  	peer2.disconnect();
  });
}


