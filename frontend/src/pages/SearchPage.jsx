import React, {useState} from 'react';
import {TextField, Button, Grid, Box, Paper} from '@mui/material';
import fetchFunc from "../service/fetchRequest";
import {useNavigate} from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';

const CarSearchPage = () => {
    const [keywords, setKeywords] = useState({});
    const navigate = useNavigate();
    // 添加下拉框
    // const [book, setBook] = useState('');
    const [selectBook, setSelectBook] = useState('');
    // const [rate, setRate] = useState('');
    const [selectRate, setSelectRate] = useState('');
    // const handleChange = (event) => {
    //   setValue(event.target.value);
    // };
    // console.log(book)

    // const handleSelectChange = (event) => {
    //   setSelectValue(event.target.value);
    //   setValue(event.target.value);
    // };

    const handleChange = (event) => {
        setKeywords({...keywords, [event.target.name]: event.target.value});
    };

    // 处理选择的book type
    const handleTypeChange = (event) => {
        setSelectBook(event.target.value);
        // setBook(event.target.value);
        setKeywords({...keywords, [event.target.name]: event.target.value});
    };

    // 处理选择的rating
    const handleRatingChange = (event) => {
        setSelectRate(event.target.value);
        // setRate(event.target.value);
        setKeywords({...keywords, [event.target.name]: event.target.value});
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(keywords);
        const response = await fetchFunc('/searchResult/', 'POST', keywords)
        const data = await response.json();
        console.log(data)
        if (data.error) {
            alert(data.error);
            setKeywords({});
        } else {
            alert('ok!')
            navigate('/SearchResultPage', {state: {results: data}});
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
            <Paper elevation={3} sx={{padding: 4, maxWidth: "50vw"}}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {/* <Grid item xs={12} sm={6}>
            <TextField
              name="isbn"
              label="ISBN"
              fullWidth
              onChange={handleChange}
            />
          </Grid> */}
                        {/* ----------------尝试下拉框---------------- */}
                        <Grid item xs={12} sm={6}>
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel id="bookType">Book Type</InputLabel>
                                <Select
                                    // labelId="bookType"
                                    name='category'
                                    value={selectBook}
                                    onChange={handleTypeChange}
                                    label="category"
                                >
                                    {['society', 'novel', 'fiction', 'science', 'health'].map((type) => (
                                        <MenuItem key={type} value={type}>
                                            {type}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        {/* -----------------评分---------------- */}
                        <Grid item xs={12} sm={6}>
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel id="bookType">Select rate</InputLabel>
                                <Select
                                    // labelId="bookType"
                                    name='avg_rating'
                                    value={selectRate}
                                    onChange={handleRatingChange}
                                    label="avg_rating"
                                >
                                    {['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'].map((rating) => (
                                        <MenuItem key={rating} value={rating}>
                                            {rating}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            {/* -----------------作者----------------  */}
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
                        {/* <Grid item xs={12} sm={6}>
            <TextField
              name="avg_rating"
              label="Average Rating"
              fullWidth
              onChange={handleChange}
            />
          </Grid> */}
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" type="submit">
                                Search
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