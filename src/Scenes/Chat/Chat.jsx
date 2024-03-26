import React, {useState,useMemo} from 'react';
import  {useEffect,useSelector } from 'react-redux';
import {useLocation} from 'react-router-dom';
import {useQuery} from 'react-query';
import useSWR from "swr";
import axios from "axios";
import Navbar from 'Scenes/Navbar/Navbar';
import FlexBetween from 'Components/FlexBetween';
import { Box,useTheme,InputBase,Button } from '@mui/material';
import FriendListWidget from 'Scenes/Widgets/FriendListWidget';

// import io from 'socket.io-client';

// const socket = io.connect('http://http://localhost:3001/',{
//     transports: ['websocket'],
//     upgrade: false
//     });

  // WebSocket connection setup goes here
  const Chat = () => {

    const { palette } = useTheme();
    const main = palette.neutral.main;
   
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const friends = useSelector((state) => state.user.friends);
    const [messageInput, setMessageInput] = useState('');
    const {state} = useLocation();
    const { friendId } = state; 

    const messageArray =[];
    const roomId = _id.concat("-".concat(friendId));
  const sendMessage = async () => {
    const formData = new FormData();
    formData.append('friendId', friendId);
    formData.append('content', messageInput);

    let object = {};
    formData.forEach((value, key) => {
      object[key] = value;
    });
    let data = JSON.stringify(object);

    const send = await fetch(
        //`http://localhost:3001/chat/chat/${_id}/`,
        `http://localhost:3001/chat/${_id}/`,
        {
          method: 'POST',
          headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json',
          },
          body: data,
        }
      );
      setMessageInput('');
  };
  const fetcher = async (url) => {
    const res = await axios.get(url, {
      headers: {
        "Authorization": `${token}`,
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  };



    const { data, error, isLoading } = useSWR(`http://localhost:3001/chat/${roomId}/`, fetcher, { refreshInterval: 1000 })


  return (

    <div className="App">
      <div className="chat-container">
      <Navbar/>
        <div className="Chat">
            {data ? (
                data.map((content) => {
                    return <div> {content.fullName}: {content.content}</div>
                })
            ) : (
                <div>loading</div>
            )}
        </div>
      <FlexBetween gap='1.5rem'>
        <InputBase
          placeholder="Type your message..."
          onChange={(e) => setMessageInput(e.target.value)}
          value={messageInput}
          sx={{
            width: '100%',
            backgroundColor: palette.neutral.light,
            borderRadius: '2rem',
            padding: '1rem 2rem',
          }}
        />
          <Button
          onClick={sendMessage}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: '3rem',
          }}
        >
          SEND
        </Button>
      </FlexBetween>

            <FriendListWidget userId={_id} />
      </div>
    </div>
  );
}

export default Chat;