import {useState,useEffect} from 'react';
import localStorage from 'localStorage';
import jwt from 'jsonwebtoken';
import {message} from 'antd';
import socket from './socket';
import './Signin.css'
//Signin component and generating token for user
function SignIn({setIsSignedIn}) {
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const signin=()=>{
        if(username && password){
            let token = jwt.sign({username},"thisIsSomeSecret");
            localStorage.setItem('key',token);
            setIsSignedIn(true)
            socket.emit('join',{userName:username,room:"Default_Room"})
        }else{
            message.warn('Please enter valid values!')
        }
    }
    return (
        <>
        <div className="header">
          <h1>Chinthakayyya Chatting App</h1>
        </div>
            <div className="signin-details">
            <form className="form">
            <div style={{width:"100%",display:"flex",flexDirection:"column"}}>
            <p className="label">Username</p>
            <input placeholder='Username' value={username} onChange={(e)=>{setUsername(e.target.value)}}/></div>
            <div style={{width:"100%",display:"flex",flexDirection:"column"}}>
            <p className="label">Password</p>
            <input placeholder='password' type='password' value={password} onChange={(e)=>{setPassword(e.target.value)}}/></div>
            <button className="Signin-button" onClick={signin}>Sign In</button>
            </form>
            </div>
        </>
    )
}

export default SignIn;