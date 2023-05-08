import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {useMemo, useState} from 'react';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Grid
} from '@mui/material';
import {Link} from 'react-router-dom';
// import BookDetail from './../components/BookDetail';
import {useLocation} from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(2),
    },
    gridContainer: {
        marginBottom: theme.spacing(2),
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    coverImage: {
        width: '100%',
        height: '300px',
        objectFit: 'cover',
        marginBottom: theme.spacing(2),
    },
    sortContainer: {
        marginBottom: theme.spacing(2),
    },
    card: {
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
    },
}));

// const books = {
//   34: {title: 'Der Fluch der Kaiserin. Ein Richter- Di- Roman.', author: 'Eleanor Cooney', publication_date: '2001', image: 'http://images.amazon.com/images/P/3442353866.01.LZZZZZZZ.jpg', category: 'society', price: '10', },
//   5050: {title: 'Die eiserne Kaiserin. Ein Richter- Di- Roman.', author: 'Eleanor Cooney', publication_date: '1998', image: 'http://images.amazon.com/images/P/3442350484.01.LZZZZZZZ.jpg', category: 'society', price: '20',},
//   26225: {title: 'Shangri-LA: The Return to the World of Lost Horizon', author: 'Eleanor Cooney', publication_date: '1996', image: 'http://images.amazon.com/images/P/0688128726.01.LZZZZZZZ.jpg', category: 'science', price: '30',},
//   106161: {title: "The Court of the Lion: A Novel of the T'Ang Dynasty", author: 'Eleanor Cooney', publication_date: '1990', image: 'http://images.amazon.com/images/P/0380709856.01.LZZZZZZZ.jpg', category: 'fiction', price: '15',},
// };

function BookShelf() {
    const classes = useStyles();
    const location = useLocation();
    const results = location.state?.results || [];
    // const results = books;
    console.log('传过来的东西', results)

    // check if the book is in the favorite list
    const [favorites, setFavorites] = useState(new Set());
    const handleFavoriteClick = (bookId) => {
        const newFavorites = new Set(favorites);

        if (favorites.has(bookId)) {
            newFavorites.delete(bookId);
        } else {
            newFavorites.add(bookId);
        }

        setFavorites(newFavorites);
        sendFavoriteRequest(bookId);
    };

    const [sortOrder, setSortOrder] = useState('New to Old');
    const [priceOrder, setPriceOrder] = useState('Hight to Low');

    //handle the change of sort order
    const handleOrderChange = (event) => {
        const selectedOrder = event.target.value;
        console.log(selectedOrder)
        setSortOrder(selectedOrder);
        setPriceOrder(selectedOrder);
    };
    //sort the books
    const sortedBooks = useMemo(() => {
        return Object.values(results.book_list).sort((a, b) => {
            if (sortOrder === 'New to Old') {
                return new Date(b.publication_date) - new Date(a.publication_date);
            } else if (sortOrder === 'Old to New') {
                return new Date(a.publication_date) - new Date(b.publication_date);
            } else if (priceOrder === 'High to Low') {
                return parseFloat(b.price) - parseFloat(a.price);
            } else if (priceOrder === 'Low to High') {
                return parseFloat(a.price) - parseFloat(b.price);
            }
        });
    }, [results, sortOrder, priceOrder]);

    //send the favorite request to the backend
    const sendFavoriteRequest = (bookId) => {
        alert(`Add ${bookId} to favorites`);
    };

    return (
        <>
            <h2>Result list</h2>
            <Box className={classes.sortContainer}>
                <FormControl fullWidth variant="standard">
                    <InputLabel>Sort by Date</InputLabel>
                    <Select value={sortOrder} onChange={handleOrderChange}>
                        <MenuItem value="New to Old">Age (Newest first)</MenuItem>
                        <MenuItem value="Old to New">Age (Oldest first)</MenuItem>
                        <MenuItem value="High to Low">Price (Highest first)</MenuItem>
                        <MenuItem value="Low to High">Price (Lowest first)</MenuItem>
                    </Select>
                </FormControl>
                {/* <FormControl fullWidth variant="standard">
          <InputLabel>Sort by Price</InputLabel>
          <Select value={priceOrder} onChange={handlePriceOrderChange}>
            <MenuItem value="High to Low">Price (Highest first)</MenuItem>
            <MenuItem value="Low to High">Price (Lowest first)</MenuItem>
          </Select>
        </FormControl> */}
            </Box>
            <div className={classes.root}>
                {sortedBooks.length === 0 ? (
                    <div>No book result</div>
                ) : (
                    <Grid container spacing={4} className={classes.gridContainer}>
                        {sortedBooks.map((book) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
                                <Card className={classes.card}>
                                    <CardActionArea component={Link} to={`/BookDetail/${book.id}`}>
                                        <CardMedia component="img" image={book.image} alt={book.title}
                                                   className={classes.coverImage} loading="lazy"/>
                                    </CardActionArea>
                                    {/* 添加收藏 */}
                                    <div style={{position: 'relative'}}>
                                        <IconButton
                                            aria-label="add to favorites"
                                            onClick={() => handleFavoriteClick(book.id)}
                                            sx={{position: 'absolute', top: 0, right: 0}}
                                        >
                                            {favorites.has(book.id) ? <FavoriteIcon/> : <FavoriteBorderIcon/>}
                                        </IconButton>
                                    </div>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            Title: {book.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Author: {book.author}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Public date: {book.publication_date}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Price: ${book.price}
                                        </Typography>
                                        {/* 添加评分与评论数 */}
                                        <Typography variant="body2" color="text.secondary">
                                            Rating: {book.avg_rating} / 10
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Category: {book.category}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Reviews: {book.reviews}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                )}

            </div>
        </>

    );
}

export default BookShelf;