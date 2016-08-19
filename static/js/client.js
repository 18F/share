// This is a very simple code example. See chat.html for a more involved
// example.

var peer1;
var peer2;

// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
// courtesy of https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function generatePeerAndIds() {

    peer1ID = ""+getRandomInt(0,100000); //implicit to string conversion
    peer2ID = ""+getRandomInt(0,100000); //implicit to string conversion
    while(peer2ID === peer1ID){
    	//ensures uniqueness
    	peer2ID = ""+getRandomInt(0,100000);
    }
    window.peer1 = peer1 = new Peer(peer1ID,{  
      host: location.hostname,
      port: location.port || (location.protocol === "https: "? 443 : 80),
      path: '/peerjs',
      debug: 3});
   
 	$("#url_to_share").append("localhost:8080/"+peer1ID+"-"+peer2ID);   
}

function parseUrlAndConnectToPeer1(){
    
    url = window.location.pathname;
    peer1ID = url.split("-")[0].replace("/","");
    peer2ID = url.split("-")[1];
    
    /*window.peer1 = peer1 = new Peer(peer1ID,{  
      host: location.hostname,
      port: location.port || (location.protocol === "https: "? 443 : 80),
      path: '/peerjs',
      debug: 3});*/

    window.peer2 = peer2 = new Peer(peer2ID,{ 
      host: location.hostname,
      port: location.port || (location.protocol === "https: "? 443 : 80),
      path: '/peerjs',
      debug: 3});

    peer1.on('open', function(id){
      var conn = peer2.connect(peerID1);
    });
}
    
/*
    conn.on('data', function(data) {
        // When we receive 'Hello', send ' world'.
        $('#helloworld').append(data);
        conn.send(' peer');
      });
    // Wait for a connection from the second peer.
    peer1.on('connection', function(connection) {
      // This `connection` is a DataConnection object with which we can send
      // data.
      // The `open` event firing means that the connection is now ready to
      // transmit data.
      connection.on('open', function() {
        // Send 'Hello' on the connection.
        connection.send('Hello,');
      });
      // The `data` event is fired when data is received on the connection.
      connection.on('data', function(data) {
        // Append the data to body.
        $('#helloworld').append(data);
      });
    });
  });
  */