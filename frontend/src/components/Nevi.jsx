import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { Link, useNavigate, useLocation } from 'react-router-dom';

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
  const user = localStorage.getItem('user')
  console.log('login?',user)

  // log out function
  const logoutBtn = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('agent');
    console.log('logout',user)
    navigate("/login");
  }
  // eslint-disable-next-line

  const navigate = useNavigate();
  const { pathname } = useLocation();
  React.useEffect(() => {
    if (user !== null) {
      if (pathname === '/login' || pathname === '/register') {
        navigate('/homepage');
      } else if (user === null) {
        if (pathname !== '/login') {
          navigate('/login');
        }
      }
    }
  }, [user, navigate, pathname]);


  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title} >
            <Button component={Link} to="/homepage" sx={{ textDecoration: "underline" }} className={classes.text}>Home</Button>&nbsp;| &nbsp;
            <Button component={Link} to="/myFav" sx={{ textDecoration: "underline" }} className={classes.text}>My Fav</Button>&nbsp;| &nbsp;
            <Button component={Link} to="/ShoppingCartpage" sx={{ textDecoration: "underline" }} className={classes.text}>Shopping Cart</Button>&nbsp;| &nbsp;
            <Button component={Link} to="/profile" sx={{ textDecoration: "underline" }} className={classes.text}>Profile</Button>&nbsp;| &nbsp;
            <Button component={Link} to="/MyOrder" sx={{ textDecoration: "underline" }} className={classes.text}>MyOrder</Button>


          </Typography>
          {!user && (
            <>
              <Button component={Link} to="/login" sx={{ textDecoration: "underline" }} className={classes.text}>Login</Button>
              <Button component={Link} to="/register" sx={{ textDecoration: "underline" }} className={classes.text}>Register</Button>
            </>
          )}
          {user && (
            <>
            <Button onClick={logoutBtn} className={classes.text}>Logout</Button>
            </>
          )
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navigator;
