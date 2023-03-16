import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [isMinimized, setIsMinimized] = useState(false);

  const handleMessageSend = (event) => {
    event.preventDefault();

    const message = event.target.elements.message.value;
    setMessages([...messages, message]);

    event.target.elements.message.value = '';
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
            <Box key={index} className="chat-message">
              <span>Anonymous:</span>
              <p>{message}</p>
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
