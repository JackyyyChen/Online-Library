// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// // import Card from '@material-ui/core/Grid';
// // import Paper from '@material-ui/core/Paper';
// import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
// import { Link } from 'react-router-dom';
// import BookDetail from './../components/BookDetail';
// import fetchFunc from "../service/fetchRequest";
//
// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: 'flex',
//     flexWrap: 'wrap',
//     flexGrow: 1,
//     padding: theme.spacing(2),
//     gap: '20px',
//   },
//   paper: {
//     padding: theme.spacing(2),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
//   },
//   coverImage: {
//     width: '20%',
//     height: '400px',
//     // width: '100%',
//     // height: 'auto',
//     marginBottom: theme.spacing(2),
//   },
// }));
//
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
//
// async function BookShelf() {
//   const classes = useStyles();
//   // 解决异步问题
//   // const [fetchData, setFetchData] = React.useState(false)
//   const userInfo = {message: 'book_info'};
//   const response = await fetchFunc('/book_quary/', 'POST', userInfo)
//   const recieve = await response.json();
//   const books=recieve.book
//   console.log('所有书：', books)
//   return (
//       <>
//         <h2>Top 10 list</h2>
//         <div className={classes.root}>
//           <React.Fragment>
//             {books.map((book) => (
//                 <Card key={book.index}>
//                   <CardActionArea component={Link} to={`/BookDetail/${book.index}`}>
//                     <CardMedia component="img" image={book.image} alt={book.title} className={classes.coverImage}/>
//                     <CardContent>
//                       <Typography gutterBottom variant="h5" component="div">
//                         {book.title}
//                       </Typography>
//                       <Typography variant="body2" color="text.secondary">
//                         {book.author}
//                       </Typography>
//                       <Typography variant="body2" color="text.secondary">
//                         {book.description}
//                       </Typography>
//                     </CardContent>
//                   </CardActionArea>
//                 </Card>
//             ))}
//             {/*<BookDetail books = {books}/>*/}
//           </React.Fragment>
//         </div>
//       </>
//
//   );
// }
//
// export default BookShelf;


import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import Card from '@material-ui/core/Grid';
// import Paper from '@material-ui/core/Paper';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
// import BookDetail from './../components/BookDetail';
import fetchFunc from "../service/fetchRequest";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    flexGrow: 1,
    padding: theme.spacing(2),
    gap: '20px',
  },
  paper: {
    // maxWidth: '300px',
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  coverImage: {
    maxWidth: '300px',
    height: '400px',
    // width: '100%',
    // height: 'auto',
    marginBottom: theme.spacing(2),
  },
    box: {
    maxWidth: '300px',
    height: '100%',
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

  const [books,setBooks] = useState([]);
  const [fetchData, setFetchData] = useState(true);
  const bookInfo = {message: 'book_info'};

  React.useEffect(() => {
    if (fetchData) {
      fetchFunc('/book_quary/', 'GET').then(response => {
        if (response.error) {
          alert('Can\'t not get books')
        }
        response.json().then((data) => {
          const list = data.book
          // console.log('book in dataset',list)
          setBooks(list)
          setFetchData(false)
        })
      })
    }
  }, [fetchData])

  // console.log('所有书：',books)
  return (
    <>
      <h2>Top n list</h2>
      <div className={classes.root}>
      <React.Fragment>
          {books.map((book) => (
            <Card key={book.index}>
            <CardActionArea component={Link} to={`/BookDetail/${book.id}`} className={classes.box}>
              <CardMedia component="img" image={book.url} alt={book.title} className={classes.coverImage}/>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {book.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {book.author}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {book.description}
                </Typography>
              </CardContent>
            </CardActionArea>
            </Card>
          ))}
      </React.Fragment>
      </div>
    </>

  );
}

export default BookShelf;

