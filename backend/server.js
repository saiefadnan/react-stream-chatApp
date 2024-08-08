require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const app = express();
const server = http.createServer(app);
const userDataRoutes = require('./routes/userData');

app.use(express.json());
app.use(cors());
app.use('/api',userDataRoutes);


const PORT =4000;
server.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});






// const fs = require('fs');
// const { Server } = require('socket.io');
// const path = require('path');
// const bodyParser = require('body-parser');
// const socketHandler = require('./socketHandler');
// // const jwt = require('jsonwebtoken');
// // const secretKey = process.env.JWT_SECRET;
// // const corsOptions = {
// //     origin: "*",
// //     methods: ['GET', 'POST', 'PUT', 'DELETE'],
// //     allowedHeaders: ["Content-Type", "Authorization", "X-Custom-Header"],
// //     exposedHeaders: ['Content-Length', 'X-Kuma-Revision'],
// //     credentials: true,
// //     maxAge: 600,
// //     preflightContinue: false,
// //     optionsSuccessStatus: 204
// // };
// // const serverCors ={
// //     cors: {
// //         origin: "*",
// //         methods: ['GET', 'POST', 'PUT', 'DELETE'],
// //         allowedHeaders: ["Content-Type", "Authorization", "X-Custom-Header"],
// //         exposedHeaders: ['Content-Length', 'X-Kuma-Revision'],
// //         credentials: true
// //     },
// //     allowEIO3: true,
// //     pingTimeout: 60000
// // }
// // const io = new Server(server,serverCors);
// // socketHandler(io);
// app.use(cors(corsOptions));
// app.use(bodyParser.json({ limit: '50mb' }));
// app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
// app.use(express.static(path.join(__dirname,'public')));




//function authenticateToken(req, res, next) {
    //     const {authorization} = req.headers;
    //     const token = authorization && authorization.split(' ')[1]; 
    //     console.log('token:',token);
    //     if(!token) return res.redirect('/login');
        
    //     return jwt.verify(token, secretKey, (err, user) => {
    //         if(err) return res.redirect('/login');
    //         req.user = user;
    //         next();
    //     });
    // }
    
    // app.get('/home', (req, res) => {
    //     res.sendFile(path.join(__dirname, 'public', 'index.html'));
    // });
    // app.get("/signin", (req, res) => {
    //     return res.sendFile(path.join(__dirname, 'public', 'signin.html'));
    // });
    
    // app.get("/login", (req, res) => {
    //     return res.sendFile(path.join(__dirname, 'public', 'login.html'));
    // });
    
    
    // app.get("/chat",authenticateToken,(req, res) => {
    //     const filePath = path.join(__dirname, 'private', 'chat.html');
    //     fs.readFile(filePath, 'utf8', (err, data) => {
    //         if (err) {
    //         res.status(500).send('Server Error');
    //         } else {
    //         res.send(data);
    //         }
    //     });
    //     //return res.sendFile(path.join(__dirname, 'private', 'chat.html'));
    // });