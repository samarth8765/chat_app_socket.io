const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);

app.use(express.static('public'));

app.get('/',(req,res)=>{
    res.sendFile(__dirname + "/index.html");
})

io.on('connection',(socket)=>{
    console.log('connected');
    socket.on('message',(msg)=>{
        socket.broadcast.emit('message',msg);
    })

});

server.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`);
});