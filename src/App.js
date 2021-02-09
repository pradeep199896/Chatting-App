import './App.css';
import socket from './socket';
import {useState,useEffect} from 'react';
import SignIn from './Signin';
import localStorage from 'localStorage';
import jwt from 'jsonwebtoken';
import 'antd/dist/antd.css';
import {message as AntMessage} from 'antd';
import AddGroup from './AddGroup';
import Groups from './groups';
import logo from "./logo.jpg"

function App() {
{/*intialising states*/}
  const [message,setMessage]=useState('');
  const [messages,setMessages]=useState([]);
  const [isSignedin,setIsSignedIn]=useState(false);
  const [user,setUser]=useState({});
  const [showAddGroup,setShowAddGroup]=useState(false);
{/*Getting token and verifying the user*/}
  useEffect(()=>{
    let token = localStorage.getItem('key');
    if(token){
      let user = jwt.verify(token,"thisIsSomeSecret");
      setUser(user);
      setIsSignedIn(true);
    }
  },[])
//waits to receive the message
  useEffect(()=>{
    // console.log('useEffect')
    socket.on('recivedMessage',(m)=>{
      let color;
      if(m.userName=='admin'){
        color='white'
      }else{
        color='orange'
      }
      setMessages(prev=>[...prev,<p className="recv-msg"><span style={{backgroundColor:color,color:'black',borderRadius:'4px',padding:'8px 16px',fontSize:"24px"}}>{`${m.userName}: ${m.message}`}</span></p>])
    })
  },[])
//emitting an event for sending a message
  const sendMessage = ()=>{
    setMessages(prev=>[...prev,<p className='sent-msg'><span style={{border:'1px soldi black', backgroundColor:"#5abbdb",color:'white',borderRadius:'4px',padding:'8px 16px',fontSize:"24px"}}>{message}</span></p>])
    socket.emit('sendMessage',message);
    setMessage('')
  }
//removing the token and clearing the url
  const logout=()=>{
    localStorage.removeItem('key');
    window.history.replaceState(null, "", `/`)
    setIsSignedIn(false);
    AntMessage.info('You have been logged out!');
  }
//if not signed in we show the signin component!
  if(!isSignedin){
    return <SignIn setIsSignedIn={setIsSignedIn}/>
  }

  return (
    <>
    <div className="App">
      <div className='title_logout'>
      <h1 style={{color:"white",padding:"10px 0px 0px 10px"}}>Chinthakayya<img style={{width:"50px"}} src={logo}/></h1>
     
      <button className="logout" onClick={logout}>Logout</button></div>
      <div className='container'>
      <div className='group-screen'>
      <button onClick={()=>{setShowAddGroup(true)}}>Create Group</button>
      <Groups user={user} setMessages={setMessages}/></div>
      {new URLSearchParams(window.location.search).get('group')?(
        <>
        <div className='messages-screen'>
          <div className='my-messages'>
        {messages}
        </div>
        <div className='send'>
        <input value={message} onChange={(e)=>{setMessage(e.target.value)}}/>
        <button onClick={sendMessage}>SEND</button></div>
        </div>
        </>
      ):(<></>)}
      </div>
    </div>
    <AddGroup showAddGroup={showAddGroup} setShowAddGroup={setShowAddGroup} />
    </>
  );
}

export default App;