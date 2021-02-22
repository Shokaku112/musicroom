var socketio = {};  
var socket_io = require('socket.io');  
// socket_io.set('transports', ['websocket', 'xhr-polling', 'jsonp-polling', 'htmlfile', 'flashsocket']);
// socket_io.set('origins', '*:*');
//获取io  

socketio.getSocketio = function(server){  
  console.log("连接成功？")
  var io = require('socket.io')(server,{
    cors: {
      origin: ["http://172.23.193.13:8080","http://localhost:8080"],
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      credentials: true,
      transports:['websocket']
    }});  
    var connection=io;
//   设置跨域访问的问题（果然找答案还是得去官方文档）
io.on('connection', function(socket){
    console.log(socket.id)
    console.log('a user connected');
    socket.on('disconnect', function(){
      console.log('user disconnected');
    });
    socket.on('callme',function(val){
        console.log(val)
    });
    socket.on('chat message', function(msg){
        console.log("mesage:",msg)
        io.emit('re1', 123456);
      });
  });



  io.emit('some event', { for: 'everyone' });

  
};  

module.exports = socketio;  
