import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { 
  Link,
} from 'react-router-dom';
// import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  link: {
    textDecoration: 'none', // 去掉下划线
    color: 'inherit', // 继承父元素颜色
  },
  title: {
    flexGrow: 1,
    color: 'inherit', // 继承父元素颜色
  },
  text: {
    color: 'white',
  }
}));

function Navigator() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title} >
            <Button component={Link} to="/homepage" sx={{ textDecoration: "underline" }} className={classes.text}>Home</Button>&nbsp;| &nbsp;
            <Button component={Link} to="/myFav" sx={{ textDecoration: "underline" }} className={classes.text}>My Fav</Button>&nbsp;| &nbsp;
            <Button component={Link} to="/homepage" sx={{ textDecoration: "underline" }} className={classes.text}>Shopping Cart</Button>
          </Typography>
          <Button component={Link} to="/login" sx={{ textDecoration: "underline" }} className={classes.text}>Login</Button>
          <Button component={Link} to="/register" sx={{ textDecoration: "underline" }} className={classes.text}>Register</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navigator;
