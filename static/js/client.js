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
var downloadAnchor = document.querySelector("a#download");
var receiveBuffer = [];
var receivedSize = 0;
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
    
 	$("#url_to_share").append("localhost:8080/receiver/"+peer1ID+"-"+peer2ID);   
  $("#url_to_share").attr("href","localhost:8080/receiver/"+peer1ID+"-"+peer2ID);
}

function sendFile(){
    //comes from generateIDs
    peer1 = new Peer(peer1ID,{  
        host: location.hostname,
        port: location.port || (location.protocol === "https: "? 443 : 80),
        path: '/peerjs',
        debug: 3});

    var offset = 0;  
    var connection = peer1.connect(peer2ID);
    connection.on("open",function(){
      console.log("sender data connection open");
      
      //setting up file obj
      var fileInput = document.querySelector('input#fileInput');
      var file = fileInput.files[0];
      console.trace('file is ' + [file.name, file.size, file.type,
      file.lastModifiedDate].join(' '));

      //defined as globals at the top of this file
      sendProgress.max = file.size;

      var chunkSize = 16384; // ~ 16kB
      var sliceFile = function(){
                      
        var reader = new window.FileReader();
        reader.onload = (function() {
          return function(event){
            console.log("sent data: ", Date());
            connection.send(event.target.result);
            sendProgress.value = offset + event.target.result.byteLength;
            
            };
          })(file); // ends internal anonymous function
        

        while (offset < file.size ){
          console.log(""+offset);
          var slice = file.slice(offset, offset + chunkSize);
          reader.readAsArrayBuffer(slice);
          offset += chunkSize;
        }
      }; //ends sliceFile 
      sliceFile();   
      peer1.disconnect(); //disconnect from the peer after the data transfer is complete
  }); //ends open connection stream

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
          console.log(data.byteLength);
          receiveBuffer.push(data);
          console.log(receiveBuffer[0]);
          receivedSize += data.byteLength;
      	  
        });

        var received = new window.Blob(receiveBuffer);
        receiveBuffer = [];
        receivedSize = 0;

        downloadAnchor.href = URL.createObjectURL(received);
        downloadAnchor.download = "file";
        peer2.disconnect();
      });
    });
}
    