import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
// import BookDetail from './../components/BookDetail';
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
    width: '20%',
    height: '400px',
    // width: '100%',
    // height: 'auto',
    marginBottom: theme.spacing(2),
  },
}));

// const books = [
//   {
//     index: 1,
//     image: 'http://images.amazon.com/images/P/0195153448.01.LZZZZZZZ.jpg',
//     author: 'Author 1',
//     description: 'Book 1 summary',
//   },
//   {
//     index: 2,
//     image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRTgZly-A9fEWh4q7JmzRCBN4VZ8VkzWRud9DFP3KMMd5Sgs5wGZLhh9SGCDli-gCSbymJsyEhGKsZ08Kql-sK7XqkM6UMB6o4Uq0LcdvCCjswNwCA_RrQQ&usqp=CAc',
//     author: 'Author 2',
//     description: 'Book 2 summary',
//   },
//   {
//     index: 3,
//     image: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcS06SMivswz2hBZwZql4X7gRWbzS1qPO1kKpnsfbx8Nc-6Pbsh78gRb7k-e9_kMzx9icgneE8GneSi04j9y1eGy6WMxWxtG7xj9t2DnIaGLqQzVGtcP4VBm&usqp=CAc',
//     author: 'Author 3',
//     description: 'Book 3 summary',
//   },
//   // ...more books
// ];

function BookShelf() {
  const classes = useStyles();
  const location = useLocation();
  const results = location.state?.results || [];

  console.log('传过来的东西',results)

  // console.log('book',book)

   // 判断是否点击收藏
   const [isFavorite, setIsFavorite] = useState(false);
   const handleFavoriteClick = () => {
     setIsFavorite(!isFavorite);
     sendFavoriteRequest(results.title);
   };
   const sendFavoriteRequest = () => {
     alert('add fav!!')
   }
  
  console.log('111：',results.book_list)
  return (
    <>
      <h2>Result list</h2>
      <div className={classes.root}>
          <React.Fragment>
          {Object.keys(results.book_list).map((book) => (
            <Card key={book}>
            <CardActionArea component={Link} to={`/BookDetail/${book}`}>
              <CardMedia component="img" image={results.book_list[book].image} alt={book.title} className={classes.coverImage}/>
            </CardActionArea>
            {/* 添加收藏 */}
              <div style={{ position: 'relative' }}>
                <IconButton

                  aria-label="add to favorites"
                  onClick={handleFavoriteClick}
                  sx={{ position: 'absolute', top: 0, right: 0 }}
                >
                  {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
              </div>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {results.book_list[book].title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {results.book_list[book].author}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {results.book_list[book].publication_date}
                </Typography>
              </CardContent>
            </Card>
          ))}
          {/*<BookDetail books = {books}/>*/}

      </React.Fragment>

      </div>
    </>
    
  );
}

export default BookShelf;
