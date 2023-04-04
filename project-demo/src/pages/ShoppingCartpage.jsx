import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
  Stack,
} from '@mui/material';
import fetchFunc from "../service/fetchRequest";


const CartPage = () => {
  const [books, setBooks] = useState([
    {
      id: 1,
      title: 'React入门',
      author: '张三',
      price: 100,
      cover: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRTgZly-A9fEWh4q7JmzRCBN4VZ8VkzWRud9DFP3KMMd5Sgs5wGZLhh9SGCDli-gCSbymJsyEhGKsZ08Kql-sK7XqkM6UMB6o4Uq0LcdvCCjswNwCA_RrQQ&usqp=CAc',
    },
    {
      id: 2,
      title: 'JavaScript高级编程',
      author: '李四',
      price: 120,
      cover: 'http://images.amazon.com/images/P/0195153448.01.LZZZZZZZ.jpg',
    },
    // ...其他书籍数据
  ]);

//   const [books, setBooks] = useState([]);
  // 获取书本的函数
  const shoppingBooks = async () => {
    try {
      const response = await fetchFunc('/getShopppingBooks/', 'Get')
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  // 在组件挂载时获取书本
  useEffect(() => {
    shoppingBooks();
  }, []);

  const handleRemove = async (bookId) => {
    // 这里发送删除请求到后端
    try {
        const response = await fetchFunc('/deleteFav/', 'Delete')
        const data = await response.json();
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    setBooks(books.filter((book) => book.id !== bookId));
    
  };

  const handlePay = () => {
    alert('支付成功！')
  };

  const calculateTotalPrice = () => {
    return books.reduce((total, book) => total + book.price, 0);
  };

  return (
    <Grid container>
    <Grid item xs={12} md={6}>
      <Box>
       {/* 左边边部分 */}
       {books.map((book) => (
        <Card key={book.id} sx={{ marginBottom: 2, borderRadius: 2, boxShadow: 3 }}>
          <Grid container>
            <Grid item xs={12} sm={4}>
              <CardMedia
                component="img"
                sx={{ width: '100%', maxHeight: 200, objectFit: 'contain', padding: 2 }}
                image={book.cover}
                alt={book.title}
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {book.title}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {book.author}
                </Typography>
                <Typography variant="body1">${book.price}</Typography>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleRemove(book.id)}
                //   sx={{ borderRadius: '50%', minWidth: 40, minHeight: 40, padding: 0, marginLeft: 2 }}
                >
                  {/* <Typography variant="body2" fontWeight="bold">
                    &times;
                  </Typography> */}
                  删除
                </Button>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      ))}
      </Box>
    </Grid>
    <Grid item xs={12} md={6}>
    {/* 右边部分 */}
    <Box sx={{ marginTop: 3 }}>
        <Typography variant="h3" component="div">
           你购买的物品：
        </Typography>
        <br />
        <Stack spacing={2}>
        {books.map((book) => (
            <Typography key={book.id} variant="h5" component="div">
            {book.title}
            </Typography>
        ))}
        </Stack>
        <Box sx={{ marginTop: 3, display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h5" component="div">
            总价：${calculateTotalPrice()}
        </Typography>
        <Button
            variant="contained"
            color="primary"
            onClick={handlePay}
            sx={{ boxShadow: 3, borderRadius: 2 }}
        >
            结账
        </Button>
        </Box>
    </Box>
    </Grid>
  </Grid>
  );
};

export default CartPage;
