import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import fetchFunc from "../service/fetchRequest";

async function fetchAnswer(question) {
  // try {
  //   const response = await fetch('/api/ask', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ question }),
  //   });
    const user = localStorage.getItem('user')
    if(user === ''){
        alert('login first')
    } else {
        try{ console.log('Question',question)
    const sent_question = {username:user,question:question}
    const response = await fetchFunc('/sentText/','POST',sent_question)
    const data = await response.json();
        console.log('Answer',data)
      return data.message;
    }
    // if (data.error) {
    //   return 'Error fetching answer';
    // }
    // else {
    //   return data.answer;
    // }
    catch (error) {
    console.error('Error fetching answer:', error);
    return 'Error fetching answer';
    }
  }
}

function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [isMinimized, setIsMinimized] = useState(false);

  const handleMessageSend = async (event) => {
    event.preventDefault();

    const question = event.target.elements.message.value;
    setMessages([...messages, { text: question, isUser: true }]);

    event.target.elements.message.value = '';

    const answer = await fetchAnswer(question);
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: answer, isUser: false },
    ]);
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.3)',
        display: 'flex',
        flexDirection: 'column',
        width: '300px',
        height: isMinimized ? '50px' : '400px',
        transition: 'height 0.5s ease',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(0, 0, 0, 0.3)',
          padding: '10px',
          fontSize: '20px',
          cursor: 'pointer',
        }}
        onClick={() => setIsMinimized(!isMinimized)}
      >
        <span>Chat</span>
        <Button variant="contained" size="small">
          {isMinimized ? 'Expand' : 'Minimize'}
        </Button>
      </Box>

      {/* Chat history */}
      {!isMinimized && (
        <Box
          sx={{
            flexGrow: 1,
            overflow: 'auto',
            padding: '10px',
          }}
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              className="chat-message"
              sx={{
                marginBottom: '10px',
                textAlign: message.isUser ? 'right' : 'left',
              }}
            >
              <span>{message.isUser ? 'You:' : 'Bot:'}</span>
              <p>{message.text}</p >
            </Box>
          ))}
        </Box>
      )}

      {/* Chat input */}
      {!isMinimized && (
            <Box sx={{ padding: '10px' }}>
            <form onSubmit={handleMessageSend}>
              <TextField
                label="Enter message"
                variant="outlined"
                size="small"
                fullWidth
                margin="normal"
                name="message"
              />
              <Button variant="contained" type="submit" fullWidth>
                Send
              </Button>
            </form>
          </Box>
        )}
      </Box>
      );
    }

    export default ChatWindow;