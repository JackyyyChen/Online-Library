import React from 'react';
import { Button, Card, CardContent, Typography } from '@mui/material';

const Order = ({ order, onDelete }) => {
  const { id, delivery, payment, shipping_address, status, refund, total_price, updated_at, user_id, books_in_order } = order;

  const handleCancelOrder = () => {
    onDelete(order.id);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Order Info</Typography>
        <Typography>Order number: {id}</Typography>
        <Typography>User name: {user_id}</Typography>
        <Typography>Pay methods: {payment}</Typography>
        <Typography>Delivery: {delivery}</Typography>
        <Typography>Deliver address: {shipping_address}</Typography>
        <Typography>Order status: {status}</Typography>
        <Typography>Refund status: {refund}</Typography>
        <Typography>Update date: {updated_at}</Typography>
        <Typography>Items：</Typography>
        <ul>
          {books_in_order.map((item, index) => (
            <li key={index}>
              - Title: {item[0]}
              - Author: {item[1]}
              - Quantity: {item[2]}
              - Price: {item[3]}
            </li>
          ))}
        </ul>
        <Typography>Total price: {total_price}</Typography>
        <Button onClick={handleCancelOrder} variant="contained" color="error">
          Delete order
        </Button>
      </CardContent>
    </Card>
  );
};

export default Order;