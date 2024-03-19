const server=require('express');
const http=require('http');
const WebSocket = require('ws');
const app=server();
const server_=http.createServer(app)
const wss = new WebSocket.Server({server:server_  });
const cors = require('cors');
app.use(cors());
wss.on('connection', (ws) => {
    console.log('Client connected');
  
    ws.on('message', (message) => {
      // Broadcast the message to all clients
      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
    });
  
    ws.on('close', () => {
      console.log('Client disconnected');
    });
  });
server_.listen(8000)