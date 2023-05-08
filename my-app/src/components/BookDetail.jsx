import React, {useState, useEffect} from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import {makeStyles} from '@material-ui/core/styles';
import {Card, CardContent, CardMedia, Typography, Paper} from '@mui/material';
import Button from '@mui/material/Button';
import RatingPage from './RatingPage';
import fetchFunc from "../service/fetchRequest";
import {useLocation} from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

// define style
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
//define component
const SplitLayout = () => {
    const classes = useStyles();
    const location = useLocation();
    const currentUrl = location.pathname;
    const parts = currentUrl.split('/');
    const id = parseInt(parts.pop(), 10);
    const giveID = {id: id}
    const [book, setBook] = useState([]);
    const [open, setOpen] = useState(false);
    const [favorites, setFavorites] = useState([]);

    // ---------------------写死的test---------------------
    // const fetchData = async () => {
    //   const sampleBookData = {
    //     id: 1,
    //     title: 'The Catcher in the Rye',
    //     author: 'J.D. Salinger',
    //     publication_date: '1951-07-16',
    //     publisher: 'Little, Brown and Company',
    //     category: 'Fiction',
    //     price: '19.99',
    //     url: 'http://images.amazon.com/images/P/0195153448.01.LZZZZZZZ.jpg',
    //   }
    //   setBook([sampleBookData]);
    // }

    // ---------------------fetch---------------------
    const fetchData = async () => {
        const response = await fetchFunc('/getThisBook/', 'POST', giveID);
        console.log(giveID);
        const data = await response.json();
        console.log(data);
        setBook([data]);
    };
    // ---------------------fetch---------------------
    useEffect(() => {
        fetchData();
    }, []);

    //get username
    const user = localStorage.getItem('user')
    const userName = {userName: user};
    const [userID, setUserID] = useState('');
    //get user id
    useEffect(() => {
        const fetchData = async () => {
            if (userName === '') {
                alert('You need to login first');
            }
            const response = await fetchFunc('/getThisUser/', 'POST', userName);
            const data = await response.json();
            console.log(data);
            if (data.error) {
                alert(data.error);
            } else {
                setUserID(data.ID);
            }
        };
        fetchData();
    }, [id]);

    //add to shopping cart
    const addToShoppingCart = async () => {
        const addBookInfo = {user_id: userID, book_id: id};
        const response = await fetchFunc('/addToCart/', 'POST', addBookInfo);
        const data = await response.json();
        console.log(data);
        if (data.error) {
            alert(data.error);
        } else {
            alert('Add shopping cart succeed!');
        }
    };

    // add to favorites
    const addToFavorites = async () => {
        console.log(giveID.id)
        const bookInfo = {username: user, book_id: giveID.id};
        const response = await fetchFunc('/getUserFolders/', 'POST', bookInfo);
        const data = await response.json();
        if (data.message) {
            alert(data.message)
        } else {
            // alert('Success')
            setFavorites(data.collections);
        }
        console.log(data.collections)
        setOpen(true);
    };

    // ----------写死的test--------------
    // const addToFavorites = () => {
    //   const mockFavorites = [
    //     { id: 1, name: '科幻小说' },
    //     { id: 2, name: '非虚构作品' },
    //     { id: 3, name: '心灵成长' },
    //     { id: 4, name: '历史书籍' },
    //   ];
    //
    //   setFavorites(mockFavorites);
    //   setOpen(true);
    // };
    //handle close
    const handleClose = () => {
        setOpen(false);
    };
    //handle add to favorite
    const handleAddToFavorite = async (folderName) => {
        const addToFolder = {username: user, book_id: giveID.id, name: folderName};
        const response = await fetchFunc('/addToFolder/', 'POST', addToFolder);
        const data = await response.json();
        if (data.error) {
            alert(data.error);
        } else {
            alert('Added success!');
        }
        setOpen(false);
    };
    //web page
    return (
        <>
            <Grid container>
                {/* 左边部分 */}
                <Grid item xs={12} md={6}>
                    <Box>
                        {book.map((book) => (
                            <Grid item xs={12} md={6}>
                                <CardMedia component="img"
                                           sx={{width: '100%', maxHeight: '100%', objectFit: 'contain', padding: 2}}
                                           image={book.url}
                                           alt={book.title}
                                />

                            </Grid>

                        ))}
                    </Box>
                </Grid>

                {/* 右边部分 */}
                <Grid item xs={12} md={6}>
                    <Box sx={{marginTop: 3}}>
                        {book.map((book) => (
                            <Grid item xs={12} sm={8}>
                                <CardContent sx={{padding: 3}}>
                                    <Typography variant="h5" component="div">
                                        Title: {book.title}
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary">
                                        Author: {book.author}
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary">
                                        Publication date: {book.publication_date}
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary">
                                        Publisher: {book.publisher}
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary">
                                        Category: {book.category}
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary">
                                        Price: {book.price}
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary">
                                        Average rating: {book.avg_rating}
                                    </Typography>
                                    <Paper sx={{width: '100%', maxHeight: '100%', objectFit: 'contain', padding: 2}}>
                                        <Typography variant="subtitle1" color="text.primary">
                                            Description:
                                        </Typography>
                                        <Typography variant="subtitle1" color="text.secondary">
                                            {book.description}
                                        </Typography>
                                    </Paper>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={addToFavorites}
                                    >
                                        Add to Collection
                                    </Button>
                                    <br/>
                                    <br/>
                                    <Button
                                        variant="contained"
                                        color="inherit"
                                        onClick={addToShoppingCart}
                                    >
                                        Add to Shopping Cart
                                    </Button>
                                </CardContent>
                            </Grid>
                        ))}
                    </Box>
                </Grid>
            </Grid>
            {/* --------------rating page-------------- */}
            <RatingPage books={book}/>
            {/* --------------收藏夹弹窗-------------- */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Choose a folder</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please add the book to a folder:
                    </DialogContentText>
                    <List>
                        {favorites.map((favorite) => (
                            <ListItem button onClick={() => handleAddToFavorite(favorite)}>
                                <ListItemText primary={favorite}/>
                            </ListItem>
                        ))}
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default SplitLayout;