import React, { useState, useEffect } from 'react';
import Rating from '@mui/lab/Rating';
import {
  Container,
  TextField,
  Box,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import fetchFunc from "../service/fetchRequest";
import { useLocation } from 'react-router-dom';

const RatingPage = () => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  // const [comments, setComments] = useState([]);
  const location = useLocation();
  const currentUrl = location.pathname;
  console.log(currentUrl)
  // 获取评论的函数
  // const fetchComments = async () => {
  //   try {
  //     const response = await fetchFunc(currentUrl, 'POST')
  //     const data = await response.json();
  //     setComments(data);
  //   } catch (error) {
  //     console.error('Error fetching comments:', error);
  //   }
  // };

  // 在组件挂载时获取评论
  // useEffect(() => {
  //   fetchComments();
  // }, []);

  const comments = [
    {
      username: '张三',
      rating: '5',
      comment: '优秀！',
    },
    {
      username: '李四',
      rating: '5',
      comment: '好看！',
    },
  ];

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleSubmit = () => {
    // 提交评分和评论
    // console.log('Rating:', rating);
    // console.log('Review:', review);
    if (rating == 0) {
      alert('至少给点分吧');
    }
    else if (review == '') {
      alert('评论不为空');
    }
    else {
      const userComment = { Rating: rating, Review: review };
      console.log(userComment)
      alert('牛逼');
    }
  };

  // // 发送请求版本
  // const handleSubmit = async () => {
  //   // 提交评分和评论
  //   // console.log('Rating:', rating);
  //   // console.log('Review:', review);
  //   const userComment = { Rating: rating, Review: review };
  //   // const userComment = { Rating: rating, Review: review }
  //   console.log(userComment)
  //   const response = await fetchFunc('/writeComment/', 'POST', userComment)
  //   const data= await response.json();
  //   if (data.error) {
  //     // 评论失败
  //       // alert('error:', data.error);
  //       alert('评论失败')
  //   } else {
  //     // 评论成功
  //       // alert(data.message)
  //       alert('评论成功')
  //   }
  // };

  return (
    <Container>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h4">评论区</Typography>
        <Typography variant="h5">用户评论</Typography>
        <List>
          {comments.map((comment, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={`用户 ${comment.username}`}
                secondary={`${comment.rating} 分 - ${comment.comment}`}
              />
            </ListItem>
          ))}
        </List>
        <Rating
          name="rating"
          value={rating}
          onChange={handleRatingChange}
          precision={0.5}
        />
        <TextField
          label="您的评价"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          value={review}
          onChange={handleReviewChange}
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          提交评分
        </Button>
      </Box>
    </Container>
  );
};

export default RatingPage;
