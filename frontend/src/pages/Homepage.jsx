import React, { useState } from 'react';
import ChatWindow from './../components/chatBox';
import GameIcon from './../components/GameIcon';
import RecomBook from '../components/RecomBook';
import SearchBar from '../components/SearchBar';
import fetchFunc from '../service/fetchRequest';

function Home() {
      const isAgent = localStorage.getItem('agent');
      const username = localStorage.getItem('user');
      const [userEmail, setUserEmail] = useState('');
      const [content, setContent] = useState('');
      const contactInfo = (
      <div>
        <h2>Contact Information</h2>
        <p>Phone: 123-456-7890</p>
        <p>Email: example@example.com</p>
      </div>
      );
      const sendFeedback = (username,email, content, isAgent) => {
          const url = '/homepage_user_agent_func/';
          const method = 'POST';
          const data = { username: username, content:content, isagent: isAgent };
          fetchFunc(url, method, data)
            .then(response => response.json())
            .then(data => {
              console.log(data);
              // Handle the response from the server
            })
            .catch(error => console.log(error));
        }

    const handleFeedback = (e) => {
    e.preventDefault();

    console.log(userEmail, content);
    sendFeedback(username, userEmail, content, isAgent);
    alert('Feedback sent!');
  };

    // const handleFeedback = (e) => {
    //   e.preventDefault();
    //   alert('Feedback sent!');
    //   const userEmail = e.target.elements.userEmail.value;
    //   const feedback = e.target.elements.feedback.value;
    //   sendFeedback(userEmail, feedback, localStorage.getItem('agent') === 'agent');
    // }
  const loggedInContact = (
    <div>
      {/* ... other code */}
      {isAgent === 'agent' ? (
        <form>
          {/* ... other code */}
          <label>
            Send email to user:
            <input
              type="text"
              name="userEmail"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
            <br />
            Feedback:
            <input
              type="text"
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </label>
          <button type="submit" onClick={handleFeedback}>
            Send
          </button>
        </form>
      ) : (
        <form>
          {/* ... other code */}
          <label>
            Send question to agent:
            <br />
            Your contact email:
            <input
              type="text"
              name="userEmail"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
            <br />
            Question:
            <input
              type="text"
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </label>
          <button type="submit" onClick={handleFeedback}>
            Send
          </button>
        </form>
      )}
    </div>
  );
  return (
    <div>
      <SearchBar/>
      <RecomBook/>
        {isAgent ? loggedInContact : contactInfo}
        <br/>
        <br/>
        <br/>
        <br/>
      <GameIcon targetPage="/gamePage"/>
      <ChatWindow />

    </div>

  );
}

export default Home;