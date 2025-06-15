// import React, { useState, useEffect, useRef } from 'react';
// import { Client } from '@stomp/stompjs';
// import SockJS from 'sockjs-client';

// function App() {
//   const [nickname, setNickname] = useState('');
//   const [isNicknameSet, setIsNicknameSet] = useState(false);
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState([]);
//   const [client, setClient] = useState(null);
//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     const stompClient = new Client({
//       webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
//       onConnect: () => {
//         console.log("Connected to WebSocket");

//         stompClient.subscribe('/topic/messages', (msg) => {
//           const body = JSON.parse(msg.body);
//           setMessages((prev) => [...prev, body]);
//         });
//       },
//     });

    


//     stompClient.activate();
//     setClient(stompClient);

//     return () => stompClient.deactivate();
//   }, []);

//   useEffect(() => {
//   if (messagesEndRef.current) {
//     messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
//   }
// }, [messages]);


//   const handleSetNickname = () => {
//     if (nickname.trim()) {
//       setIsNicknameSet(true);
//     }
//   };

//   const sendMessage = () => {
//     if (client && nickname && message) {
//       client.publish({
//         destination: "/app/chat",
//         body: JSON.stringify({ nickname, content: message }),
//       });
//       setMessage('');
//     }
//   };

  

  

// return (

  
  


//   <div
//     style={{
//       height: '100vh',
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       backgroundColor: '#1e1e1e',
//       color: '#fff',
//     }}
//   >
//     <div
//       style={{
//         width: '500px',
//         maxHeight: '90vh',
//         backgroundColor: '#2c2c2c',
//         padding: '20px',
//         borderRadius: '10px',
//         display: 'flex',
//         flexDirection: 'column',
//         overflow: 'hidden',
//       }}
//     >
//       {/* Heading Section */}
//       <h2
//         style={{
//           margin: '0 0 20px 0',
//           textAlign: 'center',
//           fontSize: '28px',
//           fontWeight: 'bold',
//           color: '#4caf50',
//         }}
//       >
//         Chat-Club
//       </h2>

//       {/* Messages Section */}
//       <div
//         style={{
//           overflowY: 'auto',
//           flex: 1,
//           marginBottom: '15px',
//         }}
//       >
//         {messages.map((msg, idx) => {
//   const isOwnMessage = msg.nickname === nickname;

//   return (
    

//     <div
//       key={idx}
//       style={{
//         display: 'flex',
//         flexDirection: isOwnMessage ? 'row-reverse' : 'row',
//         alignItems: 'center',
//         marginBottom: '10px',
//         padding: '8px',
//         backgroundColor: '#3a3a3a',
//         borderRadius: '6px',
//         alignSelf: isOwnMessage ? 'flex-end' : 'flex-start',
//         maxWidth: '80%',
//         marginLeft: isOwnMessage ? 'auto' : '0',
//         marginRight: isOwnMessage ? '0' : 'auto',
//       }}
//     >
//       {/* Avatar */}
//       <div
//         style={{
//           width: '40px',
//           height: '40px',
//           borderRadius: '50%',
//           backgroundColor: isOwnMessage ? '#4caf50' : '#888',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           fontWeight: 'bold',
//           fontSize: '18px',
//           color: '#fff',
//           marginLeft: isOwnMessage ? '10px' : '0',
//           marginRight: isOwnMessage ? '0' : '10px',
//         }}
//       >
//         {msg.nickname.charAt(0).toUpperCase()}
//       </div>

//       {/* Message Content */}
//       <div style={{ textAlign: isOwnMessage ? 'right' : 'left' }}>
//         <div style={{ fontWeight: 'bold', color: '#ccc' }}>{msg.nickname}</div>
//         <div>{msg.content}</div>
//       </div>
//     </div>
//   );
// })}

// <div ref={messagesEndRef} />

//       </div>

//       {/* Input Section */}
//       <div>
//         <div style={{ marginBottom: '10px' }}>
//           <input
//             type="text"
//             placeholder="Enter nickname"
//             value={nickname}
//             onChange={(e) => setNickname(e.target.value)}
//             disabled={isNicknameSet}
//             style={{
//               width: '70%',
//               padding: '8px',
//               marginRight: '10px',
//               borderRadius: '4px',
//               border: 'none',
//             }}
//           />
//           {!isNicknameSet && (
//             <button
//               onClick={handleSetNickname}
//               disabled={!nickname}
//               style={{
//                 padding: '8px 12px',
//                 backgroundColor: '#4caf50',
//                 color: '#fff',
//                 border: 'none',
//                 borderRadius: '4px',
//               }}
//             >
//               Set
//             </button>
//           )}
//         </div>

//         <div style={{ display: 'flex' }}>
//           <input
//             type="text"
//             placeholder="Enter message"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             style={{
//               flex: 1,
//               padding: '8px',
//               borderRadius: '4px',
//               border: 'none',
//               marginRight: '10px',
//             }}
//           />
//           <button
//             onClick={sendMessage}
//             disabled={!isNicknameSet || !message}
//             style={{
//               padding: '8px 16px',
//               backgroundColor: '#2196f3',
//               color: '#fff',
//               border: 'none',
//               borderRadius: '4px',
//             }}
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   </div>

  
// );





// }

// export default App;


























































import React, { useState, useEffect, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import './index.css'; // Make sure styles apply

function App() {
  const [nickname, setNickname] = useState('');
  const [isNicknameSet, setIsNicknameSet] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [client, setClient] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const stompClient = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
      onConnect: () => {
        console.log("Connected to WebSocket");

        stompClient.subscribe('/topic/messages', (msg) => {
          const body = JSON.parse(msg.body);
          setMessages((prev) => [...prev, body]);
        });
      },
    });

    stompClient.activate();
    setClient(stompClient);

    return () => stompClient.deactivate();
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSetNickname = () => {
    if (nickname.trim()) {
      setIsNicknameSet(true);
    }
  };

  const sendMessage = () => {
    if (client && nickname && message) {
      client.publish({
        destination: "/app/chat",
        body: JSON.stringify({ nickname, content: message }),
      });
      setMessage('');
    }
  };

  return (
    <div style={{ height: '100vh', width: '100%', position: 'relative', overflow: 'hidden' }}>
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        className="background-video"
      >
        <source src="/beachVid.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Chat UI */}
      <div
        style={{
          position: 'relative',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#fff',
          zIndex: 1,
        }}
      >
        <div
          style={{
            width: '500px',
            maxHeight: '90vh',
            backgroundColor: 'rgba(44, 44, 44, 0.85)',
            opacity:0.8,
            padding: '20px',
            borderRadius: '10px',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          <h2
            style={{
              margin: '0 0 20px 0',
              textAlign: 'center',
              fontSize: '28px',
              fontWeight: 'bold',
              color: '#4caf50',
            }}
          >
            Connect Instantly. Chat Effortlessly.


          </h2>

          <div
            style={{
              overflowY: 'auto',
              flex: 1,
              marginBottom: '15px',
            }}
          >
            {messages.map((msg, idx) => {
              const isOwnMessage = msg.nickname === nickname;
              return (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    flexDirection: isOwnMessage ? 'row-reverse' : 'row',
                    alignItems: 'center',
                    marginBottom: '10px',
                    padding: '8px',
                    backgroundColor: '#3a3a3a',
                    borderRadius: '6px',
                    alignSelf: isOwnMessage ? 'flex-end' : 'flex-start',
                    maxWidth: '80%',
                    marginLeft: isOwnMessage ? 'auto' : '0',
                    marginRight: isOwnMessage ? '0' : 'auto',
                  }}
                >
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: isOwnMessage ? '#4caf50' : '#888',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      fontSize: '18px',
                      color: '#fff',
                      marginLeft: isOwnMessage ? '10px' : '0',
                      marginRight: isOwnMessage ? '0' : '10px',
                    }}
                  >
                    {msg.nickname.charAt(0).toUpperCase()}
                  </div>

                  <div style={{ textAlign: isOwnMessage ? 'right' : 'left' }}>
                    <div style={{ fontWeight: 'bold', color: '#ccc' }}>{msg.nickname}</div>
                    <div>{msg.content}</div>
                  </div>
                </div>
              );
            })}

            <div ref={messagesEndRef} />
          </div>

          <div>
            <div style={{ marginBottom: '10px' }}>
              <input
                type="text"
                placeholder="Enter nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                disabled={isNicknameSet}
                style={{
                  width: '70%',
                  padding: '8px',
                  marginRight: '10px',
                  borderRadius: '4px',
                  border: 'none',
                }}
              />
              {!isNicknameSet && (
                <button
                  onClick={handleSetNickname}
                  disabled={!nickname}
                  style={{
                    padding: '8px 12px',
                    backgroundColor: '#4caf50',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                  }}
                >
                  Set
                </button>
              )}
            </div>

            <div style={{ display: 'flex' }}>
              <input
                type="text"
                placeholder="Enter message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={{
                  flex: 1,
                  padding: '8px',
                  borderRadius: '4px',
                  border: 'none',
                  marginRight: '10px',
                }}
              />
              <button
                onClick={sendMessage}
                disabled={!isNicknameSet || !message}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#2196f3',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                }}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

