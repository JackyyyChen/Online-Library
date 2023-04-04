// import React from 'react';
// import {
//   BrowserRouter,
//   Routes,
//   Route,
//   useParams,
//   // Link,
// } from 'react-router-dom';
// import Register from './pages/Register';
// import Login from './pages/Login';
// import Homepage from './pages/Homepage'
// import Nevi from './components/Nevi'
// import MyFav from './pages/MyFav'
// import BookDetail from './components/BookDetail'
// // import BookDetail from './pages/BookDetail'

// // const Nav = () => {
// //   return(
// //     <>
// //       <span><Link to="/login">Login</Link></span>&nbsp;| &nbsp;
// //       <span><Link to="/register">Register</Link></span>&nbsp;| &nbsp;
// //       <span><Link to="/homepage">Homepage</Link></span>
// //     </>
// //   );
// // };

// const Book = () => {
//   const params = useParams();
//   console.log(params)
//   return(
//     <>
//     <div>This is book</div>
//     <BookDetail/>
//     </>

//   )
// }

// function App () {
//   return (
//     <>
//       <BrowserRouter>
//         <Nevi/>
//         <Routes>
//           <Route path="/login" element={<Login/>} />
//           <Route path="/register" element={<Register/>} />
//           <Route path="/homepage" element={<Homepage/>} />
//           <Route path="/myFav" element={<MyFav/>} />
//           <Route path="/BookDetail/:book" element={<Book/>} />
//         </Routes>
//       </BrowserRouter>
//     </>
//   );
// }

// export default App;

//
// import React from 'react';
// import {
//   BrowserRouter,
//   Routes,
//   Route,
//   useParams,
//   // Link,
// } from 'react-router-dom';
// import Register from './pages/Register';
// import Login from './pages/Login';
// import Homepage from './pages/Homepage'
// import Nevi from './components/Nevi'
// import MyFav from './pages/MyFav'
// import BookDetail from './components/BookDetail'
// import Profile from './pages/Profile'
// import resetPW from './pages/ResetPwpage'
//
// const Book = () => {
//   const params = useParams();
//   console.log(params)
//   return(
//     <>
//     <div>This is book</div>
//     <BookDetail/>
//     </>
//   )
// }
//
// function App () {
//   const [user, setUser] = React.useState(null);
//   React.useEffect(() => {
//     const thisUser = localStorage.getItem('user');
//     if (thisUser) {
//       setUser(thisUser);
//     }
//   }, [])
//   console.log('APP打印的',user)
//
//   return (
//     <>
//       <BrowserRouter>
//         <Nevi/>
//         <Routes>
//           <Route path="/login" element={<Login setUser={setUser}/>} />
//           <Route path="/register" element={<Register setUser={setUser}/>} />
//           <Route path="/resetPW" element={<resetPW/>} />
//           <Route path="/homepage" element={<Homepage/>} />
//           <Route path="/profile" element={<Profile/>} />
//           <Route path="/myFav" element={<MyFav/>} />
//           <Route path="/BookDetail/:book" element={<Book/>} />
//         </Routes>
//       </BrowserRouter>
//     </>
//   );
// }
//
// export default App;

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
import Profile from './pages/Profile'
import ResetPwpage from './pages/ResetPwpage'
import SearchPage from './pages/SearchPage'
import SearchResultPage from './pages/SearchResultPage'
import ShoppingCartpage from './pages/ShoppingCartpage'

const Book = () => {
  const params = useParams();
  console.log(params)
  return(
    <>
    <BookDetail/>
    </>
  )
}

function App () {
  const [user, setUser] = React.useState(null);
  React.useEffect(() => {
    const thisUser = localStorage.getItem('user');
    if (thisUser) {
      setUser(thisUser);
    }
  }, [])
  console.log('APP打印的',user)

  return (
    <>
      <BrowserRouter>
        <Nevi/>
        <Routes>
          <Route path="/login" element={<Login setUser={setUser}/>} />
          <Route path="/register" element={<Register setUser={setUser}/>} />
          <Route path="/resetPW" element={<ResetPwpage/>} />
          <Route path="/homepage" element={<Homepage/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/myFav" element={<MyFav/>} />
          <Route path="/BookDetail/:book" element={<Book/>} />
          <Route path="/SearchPage" element={<SearchPage/>} />
          <Route path="/SearchResultPage" element={<SearchResultPage/>} />
          <Route path="/ShoppingCartpage" element={<ShoppingCartpage/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;