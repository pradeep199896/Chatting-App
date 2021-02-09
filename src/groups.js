import { useEffect, useState } from "react";
import axios from 'axios';
import socket from './socket';

function Groups ({user,setMessages}){
    const [groups,setGroups]=useState([]);

    useEffect(()=>{
        {/*fetching groups data in backend and setting it in state!*/}
        var config = {
            method: 'get',
            url: 'http://localhost:3000/groups',
            headers: { }
          };
          
          axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
            setGroups(()=>[...response.data.groups])
          })
          .catch(function (error) {
            console.log(error);
          });
          
    },[])
{/*displaying the group name in url ,of which the user joins */}
    const joinGroup = (group)=>{
        window.history.replaceState(null, "", `?group=${group}`)
        setMessages(()=>[])
        socket.emit('join',{userName:user.username,room:group})
    }

    return (
        <>
            <div className='groups'>
                {groups.map(g=>(
                    <p onClick={()=>{joinGroup(g)}}>{g}</p>
                ))}
            </div>
        </>
    )
}

export default Groups;