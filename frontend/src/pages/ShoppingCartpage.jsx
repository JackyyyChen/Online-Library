import React, {useState, useEffect} from 'react';
import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    Grid,
    Divider,
    TextField, Paper,
} from '@mui/material';
import fetchFunc from "../service/fetchRequest";
import {useNavigate} from 'react-router-dom';
import Order from "../components/Order";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles(() => ({
    rootProfile: {
        marginTop: '50px',
        height: '500px',
    },
}));
const CartPage = () => {
    const classes = useStyles();
    // const [existUser, setExistUser] = useState('')
    const user = localStorage.getItem('user');
    // setExistUser(user)
    console.log('userName', user);

    const userName = {userName: user};
    const navigate = useNavigate();

    // 获取书本的函数
    const [books, setBooks] = useState({});

    // const aaa = {
    //   34: {author: "Mark P. O. Morford",price: 5.8,quantity: 3,title: "Classical Mythology",url: "http://images.amazon.com/images/P/0195153448.01.LZZZZZZZ.jpg" },
    // };
    // const bbb = {book_list: aaa}

    // useEffect(() => {
    // setBooks(bbb)
    // }, []);

    console.log(books)

    const fetchBooks = async () => {
        const response = await fetchFunc('/getShoppingBooks/', 'POST', userName);
        const data = await response.json();
        console.log('这些书', data);
        if (data.message) {
            alert(data.message);
        } else {
            setBooks(data);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    const handleRemove = async (bookId) => {
        // setBooks(books.filter((book) => book !== bookId));
        const bookID = {cart_id: bookId};
        const response = await fetchFunc('/deletFromCart/', 'POST', bookID);
        const data = await response.json();
        if (data.error) {
            alert('Delete fail');
        } else {
            // 获取要删除的书的价格和数量
            const bookPrice = books.book_list[bookId].price;
            const bookQuantity = books.book_list[bookId].quantity;

            // 计算新的总价
            const newTotalPrice = books.total_price - bookPrice * bookQuantity;
            fetchBooks();
            alert('Delete successed！');
            // 更新状态
            setBooks((prevBooks) => {
                const updatedBooks = {...prevBooks};
                delete updatedBooks.book_list[bookId];
                updatedBooks.total_price = newTotalPrice.toFixed(2); // 更新 total_price
                return updatedBooks;
            });
        }
    };

    const handleAddBook = async (book, quantity) => {
        const bookID = {cart_id: book};
        console.log(bookID);
        const response = await fetchFunc('/addBookNumber/', 'POST', bookID);
        const data = await response.json();
        if (data.message) {
            fetchBooks();
            alert('Add number succeed!');
            // 更新状态
            setBooks((prevBooks) => {
                const updatedBooks = {...prevBooks};
                updatedBooks.book_list[book].quantity = parseInt(quantity);
                return updatedBooks;
            });
        } else {
            alert('Add number fail');
        }
    };

    const handleReduceBook = async (book, quantity) => {
        const bookID = {cart_id: book};
        console.log(bookID);
        const response = await fetchFunc('/reduceBookNumber/', 'POST', bookID);
        const data = await response.json();
        if (data.message) {
            fetchBooks();
            alert('Reduce number succeed!');
            // 更新状态
            setBooks((prevBooks) => {
                const updatedBooks = {...prevBooks};
                updatedBooks.book_list[book].quantity = parseInt(quantity);
                return updatedBooks;
            });
        } else {
            alert('Reduce number fail');
        }
    };

    const handlePay = () => {
        // alert('支付成功！');
        // console.log('111',{ userName: user, total_price: books.total_price } )
        navigate('/PaymentPage', {
            state: {
                results: {
                    userName: user,
                    total_price: books.total_price,
                    book_list: books.book_list
                }
            }
        });
        // navigate('/PaymentPage',{ state: { results: '111' } });

    };

    return (
        <Paper className={classes.rootProfile}>
            {user && (
                <>
                    <Grid container>
                        <Grid item xs={12} md={9}>
                            <Box sx={{marginTop: 3}}>
                                <Typography variant="h4" component="div">
                                    Shopping cart
                                </Typography>
                                <br/>
                                {books.book_list && Object.keys(books.book_list).map((book) => (
                                    <Card key={book} sx={{marginBottom: 2, borderRadius: 2, boxShadow: 3}}>
                                        <Grid item xs={12} sm={4}>
                                            <CardMedia
                                                component="img"
                                                sx={{
                                                    width: '100%',
                                                    maxHeight: 200,
                                                    objectFit: 'contain',
                                                    padding: 2,
                                                }}
                                                image={books.book_list[book].url}
                                                alt={book.title}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={8}>
                                            <CardContent>
                                                <Typography variant="h5" component="div">
                                                    {books.book_list[book].title}
                                                </Typography>
                                                <Typography variant="subtitle1" color="text.secondary">
                                                    {books.book_list[book].author}
                                                </Typography>
                                                <Typography variant="body1">${books.book_list[book].price}</Typography>
                                                <Button
                                                    variant="contained"
                                                    color="error"
                                                    onClick={() => handleRemove(book)}
                                                    sx={{marginTop: 2}}
                                                >
                                                    Delete
                                                </Button>
                                            </CardContent>
                                        </Grid>
                                        <Grid item xs={12} sm={8}>
                                            {/* <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleAddBook(book)}
                    sx={{ marginTop: 2 }}
                  >
                    +
              </Button> */}
                                            <Grid item xs={12} sm={8}>
                                                <TextField
                                                    type="number"
                                                    InputLabelProps={{shrink: true}}
                                                    inputProps={{min: "1"}}
                                                    variant="outlined"
                                                    value={books.book_list[book].quantity}
                                                    onChange={(e) => {
                                                        const newQuantity = e.target.value;
                                                        if (parseInt(newQuantity) > books.book_list[book].quantity) {
                                                            handleAddBook(book, newQuantity);
                                                        } else {
                                                            handleReduceBook(book, newQuantity);
                                                        }
                                                    }}
                                                    sx={{marginTop: 2}}
                                                />
                                            </Grid>
                                            {/* <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleReduceBook(book)}
                    sx={{ marginTop: 2 }}
                  >
                    -
              </Button> */}
                                        </Grid>
                                    </Card>
                                ))}
                            </Box>
                        </Grid>
                        {/* ==============显示结算信息==============*/}
                        <Grid item xs={12} md={3}>
                            <Box sx={{marginTop: 3}}>
                                <Typography variant="h5" component="div">
                                    Order Info
                                </Typography>
                                <br/>
                                <Divider/>
                                <Box sx={{marginTop: 2}}>
                                    {books.book_list && (
                                        <>
                                            <Typography variant="body1" component="div">
                                                Items： ({books.book_list.length} 项)
                                            </Typography>
                                            <Typography variant="h6" component="div">
                                                Total price: ${books.total_price}
                                            </Typography>
                                        </>
                                    )}
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handlePay}
                                        sx={{
                                            marginTop: 2, width: '100%', boxShadow: 3, borderRadius:
                                                2
                                        }}
                                    >
                                        Go to pay
                                    </Button>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </>)
            }
            {!user && (
                <Typography variant="h4" component="div">
                    You need to login first
                </Typography>
            )
            }
        </Paper>


    );
};

export default CartPage;