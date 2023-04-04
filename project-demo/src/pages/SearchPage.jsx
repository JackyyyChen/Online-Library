import React, { useState } from 'react';
import { TextField, Button, Grid, Box, Paper } from '@mui/material';
import fetchFunc from "../service/fetchRequest";
import { useNavigate } from 'react-router-dom';

const CarSearchPage = () => {
  const [keywords, setKeywords] = useState({});
  const navigate = useNavigate();

  const handleChange = (event) => {
    setKeywords({ ...keywords, [event.target.name]: event.target.value });
  };

  const handleSubmit =  async (event) => {
    event.preventDefault();
    console.log(keywords);
      const response = await fetchFunc('/searchResult/', 'POST', keywords)
      const data= await response.json();
      if (data.error) {
          alert('error:', data.error);
          setKeywords({});
      } else {
          alert('ok!')
          navigate('/SearchResultPage', { state: { results: data } });
          setKeywords({});
      }
  };

  return (
    <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        style={{
            backgroundImage: 'url(https://source.unsplash.com/random?library)',
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
          }}
    >
    {/* <Container> */}
    <Paper elevation={3} sx={{ padding: 4, maxWidth: "50vw"}}>
    <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="isbn"
              label="ISBN"
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="author"
              label="Author"
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="title"
              label="Title"
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="avg_rating"
              label="Average Rating"
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              搜索
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
     
    {/* </Container> */}
    </Box>
  );
};

export default CarSearchPage;
