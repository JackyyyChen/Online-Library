import React from 'react';
import { 
  BrowserRouter,
  Routes,
  Route,
  useParams,
  // Link,
} from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Homepage from './pages/Homepage'
import Nevi from './components/Nevi'
import MyFav from './pages/MyFav'
import BookDetail from './components/BookDetail'
// import BookDetail from './pages/BookDetail'

// const Nav = () => {
//   return(
//     <>
//       <span><Link to="/login">Login</Link></span>&nbsp;| &nbsp;
//       <span><Link to="/register">Register</Link></span>&nbsp;| &nbsp;
//       <span><Link to="/homepage">Homepage</Link></span>
//     </>
//   );
// };

const Book = () => {
  const params = useParams();
  console.log(params)
  return(
    <>
    <div>This is book</div>
    <BookDetail/>
    </>
    
  )
}

function App () {
  return (
    <>
      <BrowserRouter>
        <Nevi/>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/homepage" element={<Homepage/>} />
          <Route path="/myFav" element={<MyFav/>} />
          <Route path="/BookDetail/:book" element={<Book/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;