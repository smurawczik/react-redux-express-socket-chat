(function () {
    'use strict';

    let express = require('express')
    let app = express();
    let http = require('http').Server(app);
    let io = require('socket.io')(http);

    app.use(express.static(__dirname + '/../build'));

    app.get('/', function(req, res){
        res.sendFile(__dirname + '/../build/index.html');
    });

    // since router doesn`t work well in prod lets catch /chat and redirect
    app.get('/chat', function(req, res){
        res.redirect('/')
    });

    io.on('connection', function(socket){
        socket.on('chat message', function(msg){
            console.log(msg);
            // all but sender
            socket.broadcast.emit('chat message', msg);
            //io.emit('chat message', msg);
        });

        socket.on('disconnect', function (data) {
            console.log("user disconnected ", data);
        });
    });

    http.listen((process.env.PORT || 3000), function(){
        console.log('listening on *:' + (process.env.PORT || 3000));
    });
}())