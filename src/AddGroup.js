import {message, Modal} from 'antd';
import { useState } from 'react';
import axios from 'axios';
import qs from 'qs';

function AddGroup({showAddGroup,setShowAddGroup}){

    const [group,setGroup] = useState('')
 {/*fetching groups data in backend and setting it in state!*/}
    const addGroup = ()=>{
       if(group){
        var data = qs.stringify({
            'groupName': group 
           });
           var config = {
             method: 'post',
             url: 'http://localhost:3000/addGroup',
             headers: { 
               'Content-Type': 'application/x-www-form-urlencoded'
             },
             data : data
           };
           
           axios(config)
           .then(function (response) {
             console.log(JSON.stringify(response.data));
             setShowAddGroup(false);
             window.location.reload(false)
           })
           .catch(function (error) {
             console.log(error);
             message.error("could not create a group!")
           });
       }
    }
 {/*using antd to display the modal*/}
    return(
     
        <>
            <Modal
            title="Create a group!!"
            centered
            visible={showAddGroup}
            footer={null}
            onCancel={() =>{setShowAddGroup(false)}}
            >
                <input value={group} onChange={e=>{setGroup(e.target.value)}} placeholder='Group Name' />
                <button onClick={addGroup}>Create</button>
            </Modal>
        </>
    )
}

export default AddGroup;