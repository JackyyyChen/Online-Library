



import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, IconButton, List, ListItem, ListItemText, TextField, Typography } from '@material-ui/core';
// import { Close as CloseIcon } from '@material-ui/icons';
import Draggable from 'react-draggable';
import { Resizable } from 'react-resizable';

const useStyles = makeStyles((theme) => ({
  chatWindow: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[5],
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    width: 300,
    height: 400,
  },
  handle: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1),
    cursor: 'move',
  },
  title: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  body: {
    flexGrow: 1,
    overflowY: 'auto',
    padding: theme.spacing(1),
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1),
  },
  sendButton: {
    marginLeft: theme.spacing(1),
  },
  messageList: {
    width: '100%',
  },
  messageItem: {
    whiteSpace: 'pre-line',
  },
  resizeHandle: {
    backgroundColor: theme.palette.primary.main,
    width: 10,
    height: 10,
    position: 'absolute',
  },
}));

const ChatWindow = () => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ width: 300, height: 400 });
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleDrag = (_, { x, y }) => {
    setIsDragging(true);
    setPosition({ x, y });
  };

  const handleStopDrag = () => {
    setIsDragging(false);
  };

  const handleResize = (_, { size }) => {
    setIsResizing(true);
    setSize(size);
  };

  const handleStopResize = () => {
    setIsResizing(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleChangeMessage = (event) => {
    setMessage(event.target.value);
  };

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        text: message,
        time: new Date(),
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  return (
    <Draggable handle=".handle" onDrag={handleDrag} onStop={handleStopDrag}>
      <Resizable width={size.width} height={size.height} onResize={handleResize} onResizeStop={handleStopResize}>
        <div className={classes.chatWindow} style={{ transform: `translate(${position.x}px, ${position.y}px)` }}>
          <div className={classes.handle}>
            <Typography variant="subtitle1" className={classes.title}>
              Chat
            </Typography>
            <IconButton size="small" onClick={handleClose}>
              {/* <CloseIcon /> */}
              <div>x</div>
        </IconButton>
      </div>
      <div className={classes.body}>
        <List className={classes.messageList}>
          {messages.map((msg, index) => (
            <ListItem key={index}>
              <ListItemText primary={msg.text} secondary={msg.time.toLocaleString()} className={classes.messageItem} />
            </ListItem>
          ))}
        </List>
      </div>
      <div className={classes.footer}>
        <TextField label="Message" value={message} onChange={handleChangeMessage} fullWidth />
        <Button variant="contained" color="primary" className={classes.sendButton} onClick={sendMessage}>
          Send
        </Button>
      </div>
      {isResizing && <div className={classes.resizeHandle} style={{ bottom: -5, right: -5 }} />}
      {isOpen && isDragging && <div className={classes.resizeHandle} style={{ top: -5, left: -5 }} />}
    </div>
  </Resizable>
</Draggable>
);
};

export default ChatWindow;

