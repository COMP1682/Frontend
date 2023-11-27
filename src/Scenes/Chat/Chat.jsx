// import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';

// const socket = io('http://localhost:3001');

// function Chat({ socket, username, room }) {
//     const [messages, setMessages] = useState([]);
//   const [messageInput, setMessageInput] = useState('');

//   // WebSocket connection setup goes here

//   const sendMessage = () => {
//     // Implement sending messages via WebSocket here
//   };

//   return (
//     <div className="App">
//       <div className="chat-container">
//         <div className="chat-messages">
//           {messages.map((message, index) => (
//             <div key={index} className="message">
//               {message}
//             </div>
//           ))}
//         </div>
//         <div className="chat-input">
//           <input
//             type="text"
//             placeholder="Type your message..."
//             value={messageInput}
//             onChange={(e) => setMessageInput(e.target.value)}
//           />
//           <button onClick={sendMessage}>Send</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Chat;