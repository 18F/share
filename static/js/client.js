// This is a very simple code example. See chat.html for a more involved
// example.

/*

The general idea here comes from:
https://github.com/laike9m/peerjs-with-nodewebkit-tutorial

The specific idea is here:
https://www.toptal.com/webrtc/taming-webrtc-with-peerjs - this is super useful

mime types: https://github.com/jshttp/mime-types

*/

window.socket = io.connect("http://localhost:8080");
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
    
  $("#url_to_share").append("localhost:8080/receiver/"+peer1ID+"-"+peer2ID);   
  $("#url_to_share").attr("href","localhost:8080/receiver/"+peer1ID+"-"+peer2ID);
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
  var offset = 0;
  var chunkSize = 16384;
  
  var conn = peer1.connect(peer2ID);
  alert("connected to peer2");
  conn.on("open", function(){
    alert("connection started on connection open");
    conn.send(file.name);
    alert("sent filename");
	  //while (offset < file.size) {
      console.log("logging transfer")
    //  var slice = file.slice(offset, offset + chunkSize);
      //reader.readAsBinaryString(slice);
      //conn.send(JSON.stringify(reader.result));
      conn.send(file);
    //  offset += chunkSize;
    //}

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
      alert("data collected");
      buffer.push(data);
   	  console.log("data transfered, ready to download");
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

function download_file(){
 	
  //var file_content = [];
  //for(var section in window.buffer.slice(1)){
  //  file_content.push(JSON.parse(section));
  //}
  //window.file_content = file_content;
 	console.log("content downloaded");
 	//download(new Blob(file_content),window.buffer[0],"text/plain");
 	//download(window.buffer,"test.txt","text/plain");
  var reader = new window.FileReader();
  reader.readAsArrayBuffer(new Blob(buffer.slice(1))); 
  download(new Blob(reader.result),window.buffer[0],"text/plain");
}

/*
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
      
      //setting up file obj
      var fileInput = document.querySelector('input#fileInput');
      var file = fileInput.files[0];
      console.trace('file is ' + [file.name, file.size, file.type,
      sendProgress.value = offset + event.target.result.byteLength;
      file.lastModifiedDate].join(' '));

      //defined as globals at the top of this file
	  sendProgress.max = file.size;
	  var offset = 0;
      var chunkSize = 16384;                   
      var reader = new window.FileReader();
            connection.send(event.target.result);
      
            
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

}*/

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
        download(received, "picture.png","text/plain");
        /*
        downloadAnchor.href = URL.createObjectURL(received);
        
        downloadAnchor.download = "file";*/
        peer2.disconnect();
      });
    });
}
    