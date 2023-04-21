// import logo from './logo.svg';
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
} from 'react-router-dom';
// define component
const Home = () => {
    return <div>Home</div>;
};
const About = () => {
    return <div>About</div>;
};
const Profile = () => {
    return <div>Profile</div>;
};
//web page
const Nav = () => {
    return (
        <>
            <span><Link to="/">Home</Link></span>&nbsp;| &nbsp;
            <span><Link to="/about">About</Link></span> &nbsp;| &nbsp;
            <span><Link to="/profile">Profile</Link></span>
        </>
    );
};

//define app
function App() {
    return (
        <>
            <BrowserRouter>
                <Nav/>
                <hr/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/" element={<Profile/>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;