import React from 'react';
import ChatWindow from './../components/chatBox';
import RecomBook from '../components/RecomBook';
import SearchBar from '../components/SearchBar';

function Home() {

  return (
    <div>
      <SearchBar/>
      <RecomBook/>
      <h1>Welcome to Home page</h1>
      <p>This is a demo of how to create a chat window using React and MUI.</p>
      <ChatWindow />
    </div>
    
  );
}

export default Home;