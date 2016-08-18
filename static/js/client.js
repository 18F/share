// This is a very simple code example. See chat.html for a more involved
  // example.

/*
make data management as easy as possible
make maintainence as easy as possible
make putting data into the authorative
putting data people into positions of power

research guild does review - 

data service team
*/
  var user = '{{user}}';
  alert(user);
  /*$(document).ready(function() {
    // Create a new Peer with our demo API key, with debug set to true so we can
    // see what's going on.
    peer1 = new Peer({ 
      key: 'hello-there', 
      host: location.hostname,
      port: location.port || (location.protocol === "https: "? 443 : 80),
      path: '/peerjs',
      debug: 3});
    // Create another Peer with our demo API key to connect to.
    peer2 = new Peer({ 
      key: 'hello-there', 
      host: location.hostname,
      port: location.port || (location.protocol === "https: "? 443 : 80),
      path: '/peerjs',
      debug: 3});
    // The `open` event signifies that the Peer is ready to connect with other
    // Peers and, if we didn't provide the Peer with an ID, that an ID has been
    // assigned by the server.
    peer1.on('open', function(id){
      peerId1 = id;
      var c = peer2.connect(peerId1);
      c.on('data', function(data) {
        // When we receive 'Hello', send ' world'.
        $('#helloworld').append(data);
        c.send(' peer');
      });
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
    // Show browser version
    $('#browsers').text(navigator.userAgent);
  });*/