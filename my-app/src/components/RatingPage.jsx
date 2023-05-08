import React, {useState, useEffect, Component} from 'react';
import Rating from '@mui/lab/Rating';
import {
    Container,
    TextField,
    CardContent,
    Box,
    Button,
    Typography,
    Card,
    List,
    ListItem,
    ListItemText,
} from '@mui/material';
import fetchFunc from "../service/fetchRequest";
import {useLocation} from 'react-router-dom';

//define component
const RatingPage = (props) => {
    const books = props.books
    console.log(books)
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    // const [comments, setComments] = useState([]);
    const location = useLocation();
    const currentUrl = location.pathname;
    const user = localStorage.getItem('user')
    console.log(currentUrl)
    // handleRatingChange

    const handleRatingChange = (event, newValue) => {
        setRating(newValue);
    };
    // handleReviewChange
    const handleReviewChange = (event) => {
        setReview(event.target.value);
    };
    // handleSubmit
    const handleSubmit = async () => {
        // 提交评分和评论
        // console.log('rating:', rating);
        // console.log('Review:', review);
        if (rating == 0) {
            alert('Please enter scores');
        } else if (review == '') {
            alert('Comment can not be none');
        } else {
            const userComment = {username: user, book_id: books[0].id, Rating: rating, Review: review};
            console.log(userComment)
            const response = await fetchFunc('/writeReview/', 'POST', userComment)
            const data = await response.json();
            if (data.message) {
                alert(data.message)
            } else {
                alert('Write review fail')
            }
        }
    };

    return (
        <Container>
            <Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
                <Typography variant="h4">Comment area</Typography>
                <Typography variant="h5">User comments</Typography>

                {/*{books.map((comment, index) => (*/}
                {/*  <ListItem key={index}>*/}
                {/*    <ListItemText*/}
                {/*      primary={`用户 ${comment.username}`}*/}
                {/*      secondary={`${comment.rating} 分 - ${comment.comment}`}*/}
                {/*    />*/}
                {/*  </ListItem>*/}
                {/*))}*/}
                {Object.entries(books).map(([book_id, book]) => (

                    <Box key={book_id} sx={{
                        display: 'flex', flexDirection: 'column', gap: 2,
                        p: 2,
                        '&::-webkit-scrollbar': {
                            width: '6px',
                            height: '6px',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: '#888',
                            borderRadius: '3px',
                        },
                        '&::-webkit-scrollbar-track': {
                            backgroundColor: '#eee',
                            borderRadius: '3px',
                        },
                    }}>
                        {book.reviews.map((review, index) => (

                            <Card
                                // key={`${book_id}-${index}`}
                                key={index}
                                sx={{
                                    flexGrow: 0,
                                    flexShrink: 0,
                                    width: '100%',
                                    borderRadius: 1,
                                }}
                            >
                                <CardContent>
                                    <Typography variant="body2"> {`Review: ${review}`}</Typography>
                                    {/*<Typography variant="body2"> {`rating: ${this.state.selectedNumber}`}</Typography>*/}
                                </CardContent>
                            </Card>

                        ))}
                    </Box>
                ))}
                <Rating
                    name="rating"
                    value={rating}
                    onChange={handleRatingChange}
                    max={10} // 设置星星的数量为 10
                    precision={1}
                />
                <TextField
                    label="Your comment..."
                    multiline
                    rows={4}
                    variant="outlined"
                    fullWidth
                    value={review}
                    onChange={handleReviewChange}
                />
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Upload comment
                </Button>
            </Box>
        </Container>
    );
};

export default RatingPage;