import logo from './logo.svg';
import { 
  BrowserRouter,
  Routes,
  Route,
  Link,
} from 'react-router-dom';

const Home = () => {
  return <div>Home</div>;
};

const About = () => {
  return <div>About</div>;
};

const Profile = () => {
  return <div>Profile</div>;
};

const Nav = () => {
  return(
    <>
      <span><Link to="/">Home</Link></span>&nbsp;| &nbsp;
      <span><Link to="/about">About</Link></span> &nbsp;| &nbsp;
      <span><Link to="/profile">Profile</Link></span>
    </>
  );
};

function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <hr/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/" element={<Profile/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;