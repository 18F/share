// This is a very simple code example. See chat.html for a more involved
// example.

/*

The general idea here comes from:
https://github.com/laike9m/peerjs-with-nodewebkit-tutorial

*/

window.socket = io.connect("http://localhost:8080");
var peer1ID;
var sendProgress = document.querySelector('progress#sendProgress');
var receiveProgress = document.querySelector('progress#receiveProgress');

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
    

 	$("#url_to_share").append("localhost:8080/"+peer1ID+"-"+peer2ID);   
}

function sendFile(){
    //comes from generateIDs
    peer1 = new Peer(peer1ID,{  
        host: location.hostname,
        port: location.port || (location.protocol === "https: "? 443 : 80),
        path: '/peerjs',
        debug: 3});
     
    var connection = peer1.connect(peer2ID);
    connection.on("open",function(){
      console.log("sender data connection open");
      var fileInput = document.querySelector('input#fileInput')
      var file = fileInput.files[0];
      var reader = new FileReader();
      window.socket.on("sendToPeer", function(data){
        console.log("sent data: ", Date());
        connection.send(reader.readAsBinaryString(file));
        peer.disconnect();
    });

  });

}

function parseUrlAndConnectToPeer1(){
    
    url = window.location.pathname;
    peer2ID = url.split("-")[1];
    
    peer2 = peer2 = new Peer(peer2ID,{ 
      host: location.hostname,
      port: location.port || (location.protocol === "https: "? 443 : 80),
      path: '/peerjs',
      debug: 3});

    peer2.on('connection', function(connection){
      connection.on("open", function(){
      	console.log("receiver data connection open");
      	connection.on("data", function(data){
      		console.log("receive data: ", Date());
      		window.socket.emit("receive", data);
      	});
      });
    });
}
    