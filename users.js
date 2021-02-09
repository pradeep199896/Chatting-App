let users = [];
//Users functionalities
function addUser(user){
    users.push(user);
    return user;
}

function removeUser(id){
    let user = getUser(id);
    users = users.filter(user=>user.id!=id)
    return user;
}

function getUser(id){
    let user=users.filter(user=>user.id==id);
    console.log(user)
    return user[0];
}

function getUsers(room){
    return users.filter(user=>user.room==room);
}

module.exports = {addUser,removeUser,getUsers,getUser};
