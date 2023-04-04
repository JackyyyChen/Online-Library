import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
// import { ChatBubble } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    width: 300,
    height: 400,
    overflow: "auto",
    position: "relative",
  },
  input: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    marginTop: theme.spacing(1),
  },
}));

function FloatingChatWindow() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessages([...messages, inputValue]);
    setInputValue("");
  };

  return (
    <div className={classes.root}>
      <Button variant="contained" color="primary" onClick={handleToggle}>
        {/* <ChatBubble /> */}
        <div>ChatBubble</div>
      </Button>
      {open && (
        <Paper className={classes.paper}>
          {messages.map((message, index) => (
            <div key={index}>{message}</div>
          ))}
          <form onSubmit={handleSubmit}>
            <TextField
              label="Type a message..."
              variant="outlined"
              size="small"
              value={inputValue}
              onChange={handleInput}
              className={classes.input}
            />
          </form>
          <Button variant="contained" color="primary" onClick={handleInput}>Send</Button>
        </Paper>
      )}
    </div>
  );
}

export default FloatingChatWindow;