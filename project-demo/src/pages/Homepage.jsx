import React from 'react';
import ChatWindow from './../components/chatBox';
import RecomBook from '../components/RecomBook';
import SearchBar from '../components/SearchBar';

function Home() {

  return (
    <div>
      <SearchBar/>
      <RecomBook/>
      <ChatWindow />
    </div>
    
  );
}

export default Home;