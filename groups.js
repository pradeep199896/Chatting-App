let groups = [];
//Group functionalities
function addGroup(group){
    let inGroup =false;
    for(let i=0;i<groups.length;i++){
        if(groups[i]==group){
            inGroup=true;
        }
    }
    if(!inGroup){
        groups.push(group);
    }
    return groups;
}

function removeGroup(groupName){
    groups = groups.filter(group=>group.name!=groupName)
    return groups;
}

function getGroups(){
    return groups;
}

module.exports = {addGroup,removeGroup,getGroups};
