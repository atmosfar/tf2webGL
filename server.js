var express = require('express')
  , app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

var port = 3600;
server.listen(port);

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.configure(function(){
   app.use(express.static(__dirname+'/public'));
});

io.sockets.on('connection', function (socket) {
    socket.emit('message', { message: 'welcome' });
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });
});

console.log("Listening on port " + port);
console.log("\n** OBS browser source = http://localhost:"+port+"/player_profile.html");
console.log("** Web dashboard = http://localhost:"+port+"/player_dashboard.html");