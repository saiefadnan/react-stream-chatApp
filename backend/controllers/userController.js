require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../mongodb/user');
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;
const {uploadImageToAzure} = require('../azureUpload');
const { StreamChat } = require('stream-chat');
const apikey = process.env.STREAM_API_KEY;
const secretkey = process.env.STREAM_SECRET_KEY;
const chatClient = StreamChat.getInstance(apikey, secretkey);
const usernames=[];



const loginData = async(req,res)=>{
    try{
        const {email,password} = req.body;
        console.log(email);
        const user = await User.findOne({email}); 
        console.log(user);
        if(!user){
            return res.status(200).json({
                login: false,
                notify: `Invalid login attempt`,
                token: null
            });
        }
        const pass = await user.comparePassword(password);
        if(!pass){
            return res.status(200).json({
                login: false,
                notify: `Invalid login attempt`,
                token: null
            });
        }
        if(user && pass){
            usernames.push(user.username);
            const token = jwt.sign({userId: user._id},secretKey,{expiresIn: '1h'});
            return res.status(200).json({
                    login:true,
                    notify: `Welcome ${user.username}!`,
                    token

            });
        }
    }
    catch(err){
        console.error(err);
        res.status(500).send('Error occured');
    }
}

const signinData = async(req,res)=>{
    try{
        const {email, username ,password, profile} = req.body;
        console.log(email);
        let user = await User.findOne({username});
        const emails = await User.findOne({email});
        if(!user && !emails && !usernames.includes(username)){
            let imageUrl="";
            const token = jwt.sign({userId: username._id},secretKey,{expiresIn: '1h'});
            if(profile) imageUrl = await uploadImageToAzure(profile);
            else imageUrl="https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=600";
            user = new User({username,password,email,profilePicture: imageUrl});
            await user.save();
            usernames.push(username);
            res.status(200).json({
                signin:true,
                notify: `Sucessfully registered!! Welcome ${user.username}!`,
                token
            });
        }
        else{
            res.status(200).json({
                signin:false,
                notify: `Email or Username already exists! Try with another one!`,
            });
        }
                
    }
    catch(err){
        console.error(err);
        res.status(500).send('Error occured');
    }
}
const generateToken = async(req,res) =>{
    try{
        const {userEmail} = req.body;
        const token = chatClient.createToken(String(userEmail));
        // await chatClient.upsertUser({
        //     id: userEmail,
        //     role: 'user', // Make sure this role has the required permissions
        //     name: 'User Name', // Optional: Add user name
        //     image: 'user-image-url', // Optional: Add user image URL
        // });
        console.log(token);
        res.status(200).json({ token });
    }catch(err){
        console.error(err);
        res.status(400).send('error in generating token');
    }
    
}

module.exports ={
    loginData,
    signinData,
    generateToken,
    usernames
}