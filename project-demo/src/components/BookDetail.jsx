import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import RatingPage from './RatingPage';
import fetchFunc from "../service/fetchRequest";
import { useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    flexGrow: 1,
    padding: theme.spacing(2),
    gap: '20px',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  coverImage: {
    width: '100%',
    height: 'auto',
    marginBottom: theme.spacing(2),
  },
  leftComponent: {
    minHeight: '600px',
  },
  rightComponent: {
    minHeight: '650px',
  },
}));

const SplitLayout = () => {
  const classes = useStyles();
  const location = useLocation();
  const currentUrl = location.pathname;
  const parts = currentUrl.split('/');
  const id = parseInt(parts.pop(), 10);
  const giveID = { id: id }
  const [book, setBook] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchFunc('/getThisBook/', 'POST', giveID)
      const data = await response.json();
      console.log(data)
      setBook(data)
      // if (data.error) {
      //   alert('error:', data.error);
      // } else {
      //   setBook(book)
      // }
    };
    fetchData();
  }, [id]);

  console.log('拉下来的book',book)

  const addToFavorites = async () => {
    alert('add favourites');
  };

  const user = localStorage.getItem('user')
  console.log('user',user)
  const userName = {userName: user}
  const [userID,setUserID] = useState('')
  useEffect(() => {
    const fetchData = async () => {
      if (userName == '') {
        alert('You need to login first')
      }
      const response = await fetchFunc('/getThisUser/', 'POST', userName)
      const data = await response.json();
      console.log(data)
      if (data.error) {
        alert('error:', data.error);
      } else {
        setUserID(data.ID)
      }
    };
    fetchData();
  }, [id]);
  console.log('用户的ID',userID)


  const addToShoppingCart = async () => {
        const addBookInfo = { user_id: userID, book_id: id }
        const response = await fetchFunc('/addToCart/', 'POST', addBookInfo)
        const data = await response.json();
        console.log(data)
        if (data.error) {
          alert('error:', data.error);
        } else {
          alert('Add shopping cart succeed!');
        }
  };

  return (
    <>
      <Grid container>
        {/* 左边部分 */}
        <Grid item xs={12} md={6}>
          <Box>
            {/*{book.map((book) => (*/}
              <Grid item xs={12} md={6}>
              <CardMedia
                component="img"
                sx={{ width: '100%', maxHeight: '100%', objectFit: 'contain', padding: 2 }}
                image={book.url}
                alt={book.title}
              />
            </Grid>
            {/*))}*/}
          </Box>
        </Grid>

        {/* 右边部分 */}
        <Grid item xs={12} md={6}>
          <Box sx={{ marginTop: 3 }}>
            {/*{book.map((book) => (*/}
              <Grid item xs={12} sm={8}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {book.title}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    {book.author}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    {book.publication_date}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    {book.publisher}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    {book.category}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    {book.price}
                  </Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={addToFavorites}
                  >
                    添加收藏
                  </Button>
                  <br />
                  <br />
                  <Button
                    variant="contained"
                    color="inherit"
                    onClick={addToShoppingCart}
                  >
                    添加购物车
                  </Button>
                </CardContent>
              </Grid>
            {/*))}*/}
          </Box>
        </Grid>
      </Grid>
      <RatingPage />
    </>
  );
};

export default SplitLayout;