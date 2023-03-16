import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
// import { Link } from 'react-router-dom';

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
    // width: '300px',
    // height: '300px',
    width: '30%',
    height: '30%',
    marginBottom: theme.spacing(2),
  },
}));

const books = [
  {
    index: 1,
    image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTd6GaH4YPl0plsgKxzorZM7iM8AzMtNxI1D2T0obho7lmticJResfZ-z1Ku17yNvGDJ2BimacCZdd9r6yc3aolWMjPh5VyxIMvkr2ey7OO&usqp=CAc',
    author: 'Author 1',
    description: 'Book 1 summary',
  },
  {
    index: 2,
    image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRTgZly-A9fEWh4q7JmzRCBN4VZ8VkzWRud9DFP3KMMd5Sgs5wGZLhh9SGCDli-gCSbymJsyEhGKsZ08Kql-sK7XqkM6UMB6o4Uq0LcdvCCjswNwCA_RrQQ&usqp=CAc',
    author: 'Author 2',
    description: 'Book 2 summary',
  },
  {
    index: 3,
    image: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcS06SMivswz2hBZwZql4X7gRWbzS1qPO1kKpnsfbx8Nc-6Pbsh78gRb7k-e9_kMzx9icgneE8GneSi04j9y1eGy6WMxWxtG7xj9t2DnIaGLqQzVGtcP4VBm&usqp=CAc',
    author: 'Author 3',
    description: 'Book 3 summary',
  },
  // ...more books
];

const confirmBookURL = window.location.pathname
const str = confirmBookURL.match(/\d+$/); // 匹配字符串结尾的数字
const lastNumber = str ? parseInt(str[0], 10) : null; // 将匹配的数字字符串转换为数字类型
console.log(lastNumber);

    function BookShelf() {
    const classes = useStyles();
    console.log('booklist:', books)
    // const [fetchData, setFetchData] = React.useState(false)
    const currentBook = []


    const handleAddToCart = () => {
        // Add book to cart
      };

    const handleAddToReadingList = () => {
      // Add book to reading list
    };

    // original
    for (let i = 0; i < books.length; i++) {
        if(lastNumber === books[i].index){
            currentBook.push(books[i])
        }
    }
    console.log('current book', currentBook)

    return (
        <>
        <h2>Show the book details</h2>
        <div className={classes.root}>
            {currentBook.map((currentBook) => (
                      <Card key={currentBook.index} className={classes.coverImage}>
                        <CardMedia component="img" image={currentBook.image} alt={currentBook.title} />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            {currentBook.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {currentBook.author}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {currentBook.description}
                          </Typography>
                          <Button variant="contained" onClick={handleAddToCart}>
                              Add to Cart
                            </Button>
                            <Button variant="outlined" onClick={handleAddToReadingList}>
                              Add to Reading List
                            </Button>
                        </CardContent>
                      </Card>
                    ))}
        </div>
        </>
    );
    }
export default BookShelf;