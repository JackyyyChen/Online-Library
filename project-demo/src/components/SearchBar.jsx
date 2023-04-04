import * as React from 'react';
// import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, InputBase, alpha, styled } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
import {useNavigate} from 'react-router-dom';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';

// const Search = styled('div')(({ theme }) => ({
//   position: 'relative',
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.white, 0.15),
//   '&:hover': {
//     backgroundColor: alpha(theme.palette.common.white, 0.25),
//   },
//   marginLeft: 0,
//   width: '100%',
//   [theme.breakpoints.up('sm')]: {
//     marginLeft: theme.spacing(1),
//     width: 'auto',
//   },
// }));

// const SearchIconWrapper = styled('div')(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: '100%',
//   position: 'absolute',
//   pointerEvents: 'none',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: 'inherit',
//   '& .MuiInputBase-input': {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create('width'),
//     width: '100%',
//     [theme.breakpoints.up('sm')]: {
//       width: '12ch',
//       '&:focus': {
//         width: '20ch',
//       },
//     },
//   },
// }));

const Header = () => {
  const navigate = useNavigate();
  // const [searchValue, setSearchValue] = React.useState('');
  // console.log(searchValue)


  // const handleInputChange = (event) => {
  //   setSearchValue(event.target.value);
  // };

  // const handleKeyPress = (event) => {
  //   if (event.key === 'Enter') {
  //     handleSearch();
  //   }
  // };

  // const handleSearch = () => {
  //   console.log('发送内容：',searchValue)

  //   // 在此处发送搜索值到后端
  //   // fetch('/api/search', {
  //   //   method: 'POST',
  //   //   body: JSON.stringify({ query: searchValue }),
  //   //   headers: { 'Content-Type': 'application/json' },
  //   // })
  //   //   .then((res) => res.json())
  //   //   .then((data) => {
  //   //     // 处理搜索结果
  //   //     console.log(data);
  //   //   });
  // };

  const GoToSearchPage = () => {
    navigate("/SearchPage");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
          Book Recommender
        </Typography>
        <Typography variant="h6" component={Button} onClick={GoToSearchPage} sx={{ flexGrow: -1, textDecoration: 'none', color: 'inherit' }}>
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