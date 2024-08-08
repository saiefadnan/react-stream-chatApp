import React, { useEffect, useRef, useState } from 'react';
import { StreamChat } from 'stream-chat';
import { Chat, Channel, Window, ChannelHeader, MessageList, MessageInput ,Thread, LoadingIndicator, ChannelList} from 'stream-chat-react';
import 'stream-chat-react/dist/css/index.css';
import { useUser } from '../contexts/UserContext';
import Navcomp from '../components/Navcomp';
import { useNavigate } from 'react-router-dom';
const apikey = process.env.REACT_APP_STREAM_API_KEY;
const secretkey = process.env.REACT_APP_STREAM_SECRET_KEY;  
const imageUrl = 'https://cdn.vectorstock.com/i/1000x1000/44/20/skull-facing-right-cartoon-vector-42904420.webp';      

const ChatInterface = ({ }) => {
    const {userEmail} = useUser();
    const [token,setToken] = useState(null);
    const [client,setClient] = useState(null);
    const [onlineUsers,setOnlineUsers] = useState([]);
    const messageContainerRef = useRef();
    const Navigate = useNavigate();
    const filters = { type:'messaging', members: {$in: [userEmail]}}
    const sort = {last_message_at:-1}

    console.log(userEmail);
    // useEffect(() => {
    //     if(channel){
    //         const members = Object.values(channel?.state?.members).filter(members => members.user.online);
    //         console.log(members);
    //         console.log(channel?.state?.members);
    //         setOnlineUsers(members);
    //     }
    // },[channel?.state?.members])

    useEffect(() => {
        if(!userEmail)Navigate('/login');
        const fetchToken = async() =>{
            try{
                const response = await fetch('http://localhost:4000/api/token',{
                    method: 'POST',
                    headers:{
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        userEmail: String(userEmail)
                    })
                })
                if(!response.ok)throw new Error('Fetch Failure');
                else{
                    const jsonData= await response.json();
                    setToken(jsonData.token);
                    console.log(jsonData);
                }   
            }catch(err){
                console.error(err);
            }
        };
        fetchToken();
    },[userEmail]);

    useEffect(() => {
        if(!token)return;
        const initializeChat = async () => {
        const chatClient = new StreamChat(apikey);
        await chatClient.connectUser(
            {
                id: userEmail,
                name: 'User Name',
                image: imageUrl, 
            },
            token
            );
            const _channel = chatClient.channel('messaging', 'react-talk', {
                image: '',
                name: 'My-channel',
                members: [userEmail]
            });
            await _channel.watch();
            setClient(chatClient);
        };
    initializeChat();
    return () => {
        if (client) {
          client.disconnectUser();
        }
      };
    }, [token]);

    if (!client) {
        return (
            <div className="loading-container">
                <LoadingIndicator />
            </div>
        );
    }

    return ( 
        <Chat client={client} theme='messaging dark'>
            <ChannelList filters={filters} sort={sort}/>
        <Channel>
                <Window>
                    <ChannelHeader/>
                    <MessageList className='message-list'/>
                    <MessageInput className='message-input'/>
                </Window>
            <Thread/>
        </Channel>
        </Chat>
    );
}
 
export default ChatInterface;












{/* <Chat client={client} theme='messaging dark'>
        <Channel channel={channel}>
            <div className='window-container'>
                <div className='online-user'>
                    {onlineUsers?.map((member,key)=>{
                        return (<li key={key}>{member.user.id}</li>)
                    })}
                </div>
                <div className='window'>
                <Window>
                    <ChannelHeader/>
                    <MessageList className='message-list'/>
                    <MessageInput className='message-input'/>
                </Window>
                </div>
            </div>
            <Thread/>
        </Channel>
        </Chat> */}