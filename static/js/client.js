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

window.socket = io.connect(window.location.href);
var peer1ID;
var sendProgress = document.querySelector('progress#sendProgress');
var receiveProgress = document.querySelector('progress#receiveProgress');
var downloadAnchor = document.querySelector("a#download");
var receiveBuffer = [];
var receivedSize = 0;
var buffer = [];

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
        port: location.port || (location.protocol === "https: "? 443 : 80),
        path: '/peerjs',
        debug: 3});

  var fileInput = document.querySelector('input#fileInput');
  var file = fileInput.files[0];
  var reader = new window.FileReader();
  
  var conn = peer1.connect(peer2ID);
  alert("connected to peer2");
  conn.on("open", function(){
    alert("connection started on connection open");
    console.log("logging transfer");
    conn.send(file);
    peer1.disconnect();
  });
  window.conn = conn;
  window.file = file;
  window.reader = reader;
  window.file_content = file_content;  
}

function receiveData(){
  url = window.location.pathname;
  peer2ID = url.split("-")[1];
    
  alert("about to create peer2");
  peer2 = new Peer(peer2ID,{ 
      host: location.hostname,
      port: location.port || (location.protocol === "https: "? 443 : 80),
      path: '/peerjs',
      debug: 3});

  alert("peer2 created");
  peer2.on("connection", function(conn){
    alert("connection established");
    conn.on("data", function(data){
      download(data);
    });
    
  });

  alert("data added to global scope");
  //puts buffer in global state
  window.buffer = buffer;
  window.peer2 = peer2;
  peer2.on("close", function(){
    alert("connection closed");
  	peer2.disconnect();
  });
  
}


