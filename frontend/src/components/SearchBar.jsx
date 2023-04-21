import * as React from 'react';
// import { Link } from 'react-router-dom';
import {AppBar, Toolbar, Typography, InputBase, alpha, styled} from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
import {useNavigate} from 'react-router-dom';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';

//define component

const Header = () => {
    //define style
    const navigate = useNavigate();
    const GoToSearchPage = () => {
        navigate("/SearchPage");
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{flexGrow: 1, textDecoration: 'none', color: 'inherit'}}>
                    Book Recommender
                </Typography>
                <Typography variant="h6" component={Button} onClick={GoToSearchPage}
                            sx={{flexGrow: -1, textDecoration: 'none', color: 'inherit'}}>
                    <SearchIcon/>
                    Search more book
                </Typography>
                {/* <Search> */}
                {/* <SearchIconWrapper> */}
                {/* <SearchIcon onClick={handleSearch} /> */}
                {/* <SearchIcon onClick={GoToSearchPage} /> */}
                {/* <Button>Search more book</Button> */}
                {/* </SearchIconWrapper> */}
                {/* <StyledInputBase
            placeholder="Search books..."
            inputProps={{ 'aria-label': 'search' }}
            value={searchValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          /> */}
                {/* </Search> */}
            </Toolbar>
        </AppBar>
    );
};

export default Header;