const express = require('express');
const { addGroup,getGroups } = require('./groups');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const {addUser,getUsers,removeUser,getUser} =  require('./users');

app.use(express.json());
app.use(express.urlencoded({ extended: false }))
//to get all groups
app.get('/groups',(req,res)=>{
    res.json({
        groups:getGroups()
    })
});
//to add a group
app.post('/addGroup',(req,res)=>{
    addGroup(req.body.groupName);
    res.json({
        message:"added a group",
        groupName:req.body.groupName
    })
})
//connecting front end via socket
io.on('connection',(socket)=>{

    console.log("connected to socket");

    socket.on("join",({userName,room})=>{
        let newUser = addUser({name:userName,room,id:socket.id});
        addGroup(room);
        socket.join(newUser.room);
        socket.emit('recivedMessage',{userName:'admin',message:`Welcome to ${room} group!.`})
        socket.broadcast.to(newUser.room).emit('recivedMessage',{userName:'admin',message:`${newUser.name} has been added!`});
        // io.to(newUser.room).emit('roomData', { room, users: getUsers(newUser.room) });
    });
//Sending and broadcasting messages to other users
    socket.on("sendMessage",(message)=>{
        socket.broadcast.emit("recivedMessage",{userName:getUser(socket.id).name,message})
    });
//On Disconnect
    socket.on("disconnect",()=>{
        const user = removeUser(socket.id);
        if(user){
            socket.broadcast.to(user.room).emit('recivedMessage',{userName:'admin',message:`${user.name} has left!`});
        }
    });

})

http.listen('4000',()=>{
    console.log("connected to localhost:4000....")
})