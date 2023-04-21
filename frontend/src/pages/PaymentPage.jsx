import React, { useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Card,
  CardContent,
} from "@mui/material";
import { useLocation } from 'react-router-dom';
import fetchFunc from "../service/fetchRequest";

const PaymentForm = () => {
    const user = localStorage.getItem('user');
    const location = useLocation();
    const results = location.state?.results || [];
    console.log(results)
  const [formData, setFormData] = useState({
    book_list: results.book_list,
    userName: user,
    total_price: results.total_price,
    address: "",
    shippingMethod: 'flight',
    paymentMethod: "credit",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert("Payment completed");
    console.log(formData)
  // 发送fetch请求
    try {
      const response = await fetchFunc('/uploadPayForm/', 'POST', formData);
      const data = await response.json();
       if (data.message) {
      alert(data.message);
      }
    } catch (error) {
      alert('Error: Pay Fail!')
    }


  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            Complete order payment
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Order address..."
                name="address"
                value={formData.address}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl component="fieldset" fullWidth>
                {/* ---------------支付方式---------------- */}
                <FormLabel component="legend">Pay method</FormLabel>
                <RadioGroup
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="credit"
                    control={<Radio />}
                    label="Credit card"
                  />
                  <FormControlLabel
                    value="debit"
                    control={<Radio />}
                    label="Debit card"
                  />
                </RadioGroup>
                {/* ---------------邮寄方式---------------- */}
                <FormLabel component="legend">Shipping method</FormLabel>
                <RadioGroup
                name="shippingMethod"
                value={formData.shippingMethod}
                onChange={handleChange}
                >
                <FormControlLabel
                    value="flight"
                    control={<Radio />}
                    label="Very Fast"
                />
                <FormControlLabel
                    value="bus 11"
                    control={<Radio />}
                    label="Normal"
                />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Pay
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </form>
    </Card>
  );
};

export default PaymentForm;