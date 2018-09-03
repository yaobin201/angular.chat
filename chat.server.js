var express =  require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    users = [];
app.use('/',express.static(__dirname));
server.listen(8000);

console.log('express server start!');


io.on('connection',function(socket){
    socket.on('login',function(nickname){
        if(users.indexOf(nickname) > -1){
            socket.emit('loginFail');
        }
        else{
            socket.userIndex = users.length;
            socket.nickname = nickname;
            users.push(nickname);
            socket.emit('loginSuccess');
            io.sockets.emit('system',nickname,users.length,'login');
        }
    });

    socket.on('disconnect',function(){
        users.splice(socket.userIndex,1);
        socket.broadcast.emit('system',socket.nickname,users.length,'logout');
    });

    socket.on('postMsg',function(msg){
        console.log(msg);
        socket.broadcast.emit('newMsg',socket.nickname,msg);
    });

    socket.on('foo',function(data){
        console.log(data);
    });
});