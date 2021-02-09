const {app, BrowserWindow} = require('electron') 
const url = require('url') 
const path = require('path')  

let win1,win2  

function createWindow() { 
  
   win1 = new BrowserWindow({width: 800, height: 600}) 
    win2 = new BrowserWindow({width: 800, height: 600}) 
   win1.loadURL('http://localhost:3000/')
   win2.loadURL('http://localhost:3000/')
   // win.loadURL(url.format ({ 
   //    pathname: path.join(__dirname, 'index.html'), 
   //    protocol: 'file:', 
   //    slashes: true 
   // })) 
}  

app.on('ready', createWindow) 