// import React, { useState, useEffect } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// // import styles from "*.module.css";
// import fetchFunc from '../service/fetchRequest';
// // import styles from 'E:\\capstone_project_9900f16awesley\\project-demo\\src\\QuizGame.module.css'; // 导入样式文件
//
// const useStyles = makeStyles((theme) => ({
//   container: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     height: '100vh',
//     backgroundImage: "url('https://source.unsplash.com/random?library')",
//     backgroundSize: 'cover',
//     backgroundRepeat: 'no-repeat',
//     padding: '20px',
//   },
//   mainContent: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     backgroundColor: 'rgba(255, 255, 255, 0.9)',
//     padding: '20px',
//     borderRadius: '5px',
//     maxWidth: '600px',
//     width: '100%',
//     boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
//     margin:'80px 0px',
//   },
//   title: {
//     color: '#333',
//     fontSize: '36px',
//     marginBottom: '20px',
//     textAlign: 'center',
//   },
//   question: {
//     color: '#333',
//     fontSize: '24px',
//     marginBottom: '10px',
//     textAlign: 'center',
//   },
//   optionButton: {
//     backgroundColor: '#4caf50',
//     border: 'none',
//     color: 'white',
//     textAlign: 'center',
//     textDecoration: 'none',
//     display: 'inline-block',
//     fontSize: '16px',
//     margin: '10px 0',
//     cursor: 'pointer',
//     borderRadius: '5px',
//     padding: '10px 20px',
//     width: '100%',
//     transition: 'background-color 0.2s ease-in-out',
//     '&:hover': {
//       backgroundColor: '#45a049',
//     },
//   },
//   optionButtonHover: {
//     backgroundColor: '#45a049',
//   },
//   correctAnswers: {
//     color: '#333',
//     fontSize: '24px',
//     textAlign: 'right',
//     alignSelf: 'flex-end',
//     marginBottom: '20px',
//   },
//   leaderboardContainer: {
//     marginTop: '20px',
//     backgroundColor: 'rgba(255, 255, 255, 0.9)',
//     borderRadius: '5px',
//     padding: '20px',
//     boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
//     maxWidth: '600px',
//     width: '100%',
//   },
//   leaderboardTitle: {
//     color: '#333',
//     fontSize: '24px',
//     marginBottom: '20px',
//     textAlign: 'center',
//   },
//   leaderboard: {
//     marginTop: '10px',
//     borderCollapse: 'collapse',
//     width: '100%',
//     fontSize: '18px',
//   },
//   leaderboardTd: {
//     border: '1px solid #ddd',
//     padding: '8px',
//     textAlign: 'center',
//   },
//   leaderboardTh: {
//     paddingTop: '12px',
//     paddingBottom: '12px',
//     textAlign: 'center',
//     backgroundColor: '#5a5a5a',
//     color: '#f0f0f0',
//   },
//   leaderboardEvenRow: {
//     backgroundColor: '#4a4a4a',
//   },
//   leaderboardOddRow: {
//     backgroundColor: '#3a3a3a',
//   },
//   leaderboardRowHover: {
//     backgroundColor: '#2a2a2a',
//   },
//   startButton: {
//     backgroundColor: '#4caf50',
//     // border: 'none',
//     border: '1px solid #4caf50',
//     color: 'white',
//     textAlign: 'center',
//     textDecoration: 'none',
//     // display: 'inline-block',
//     display:'flex',
//     margin: '0px 20px',
//     cursor: 'pointer',
//     borderRadius: 5,
//     padding: '10px 20px',
//     fontSize: '24px',
//     transition: 'background-color 0.2s ease-in-out',
//     '&:hover': {
//       backgroundColor: '#45a049',
//     },
//   },
//   gameRules: {
//     textAlign: 'center',
//     maxWidth: '600px',
//     marginBottom: '30px',
//     justifyContent: 'space-between',
//     '& p': {
//       fontSize: '24px',
//       fontWeight: 'bold',
//     },
//     '& ul': {
//       listStyle: 'none',
//       padding: '0',
//       '& li': {
//         fontSize: '20px',
//         marginBottom: '10px',
//         textAlign: 'left',
//         // textIndent: '2em',
//         marginLeft:'2em',
//         '&:before': {
//           content: '"● "',
//           color: '#4caf50',
//           fontWeight: 'bold',
//           display: 'inline-block',
//           width: '1em',
//           marginLeft: '-1em',
//         },
//       },
//     },
//   },
//   // button
//   buttonContainer: {
//     display: 'flex',
//     justifyContent: 'flex-start',
//   },
//   }));
//
// // const questions = [
// //   {
// //     question: '《哈利·波特与魔法石》的作者是谁？',
// //     options: ['A. J.K. 罗琳', 'B. J.R.R. 托尔金', 'C. 乔治·奥威尔', 'D. C.S. 列维'],
// //     answer: 'A. J.K. 罗琳',
// //   },
// //   {
// //     question: '《指环王》三部曲的作者是谁？',
// //     options: ['A. J.K. 罗琳', 'B. J.R.R. 托尔金', 'C. 乔治·奥威尔', 'D. C.S. 列维'],
// //     answer: 'B. J.R.R. 托尔金',
// //   },
// //   {
// //     question: '《动物农场》这部小说的作者是谁？',
// //     options: ['A. J.K. 罗琳', 'B. J.R.R. 托尔金', 'C. 乔治·奥威尔', 'D. C.S. 列维'],
// //     answer: 'C. 乔治·奥威尔',
// //   },
// //   // {
// //   //   question: '《纳尼亚传奇》系列的作者是谁？',
// //   //   options: ['A. J.K. 罗琳', 'B. J.R.R. 托尔金', 'C. 乔治·奥威尔', 'D. C.S. 列维'],
// //   //   answer: 'D. C.S. 列维',
// //   // },
// //   // {
// //   //   question: '《百年孤独》的作者是谁？',
// //   //   options: ['A. 加西亚·马尔克斯', 'B. 弗朗茨·卡夫卡', 'C. 米兰·昆德拉', 'D. 艾略特'],
// //   //   answer: 'A. 加西亚·马尔克斯',
// //   // }
// // ];
// // 假设此函数从数据库获取排行榜数据
// // async function fetchLeaderboard() {
// //   // 从数据库获取数据并返回
// //   return [
// //     { name: "player1", score: 5 },
// //     { name: "player2", score: 3 },
// //     { name: "player3", score: 7 },
// //   ];
// // }
//
//
// function QuizGame() {
//   const styles = useStyles();
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [correctAnswers, setCorrectAnswers] = useState(0);
//   // const [score, setScore] = useState(0);
//   let [score, setScore] = useState(0);
//   const [timer, setTimer] = useState(30);
//   const [leaderboard, setLeaderboard] = useState([]);
//   // const [gameEnded, setGameEnded] = useState(false);
//   const [gameStarted, setGameStarted] = useState(false);
//   // 隐藏排行榜
//   const [showLeaderboard, setShowLeaderboard] = useState(false);
//
//   let [playerName, setPlayerName] = useState(null);
//   const [questions, setQuestions] = useState([]);
//
//   async function fetchQuestions() {
//       try {
//         const response = await fetchFunc("/questions/", "POST",{get:"question"})
//         const data = await response.json();
//
//         return data.question_list;
//       } catch (error) {
//         console.log(error);
//       }
//     }
//
//   async function fetchLeaderboard() {
//     try {
//       const response = await fetchFunc("/leaderboard/", "POST",{get:"leaderboard"});
//       const Data = await response.json();
//       return Data.score_list;
//     } catch (error) {
//       console.log(error);
//     }
//   }
//
//   async function updatebackendLeaderboard(playerName, score) {
//     try {
//       console.log(playerName, score);
//       const data = { username: playerName, score: score };
//       const response = await fetchFunc("/updateleaderboard/", "POST", data);
//       const responseData = await response.json();
//       if (responseData.status === "success") {
//         setLeaderboard([...leaderboard, { name: playerName, score: responseData.new_score }]);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }
//
//         useEffect(() => {
//       (async () => {
//         const questionsData = await fetchQuestions();
//         if (questionsData) {
//           setQuestions(questionsData);
//         }
//         const leaderboardData = await fetchLeaderboard();
//         if (leaderboardData) {
//           setLeaderboard(leaderboardData);
//         }
//       })();
//     }, []);
//
//     // 在 useEffect 中检查游戏是否已结束，如果是，则调用 updateLeaderboard 函数
//     useEffect(() => {
//       if (gameStarted === false && playerName !== null && playerName !== "") {
//         updatebackendLeaderboard(playerName, score);
//       }
//     }, [gameStarted, playerName, score]);
//
//   function toggleLeaderboard() {
//     setShowLeaderboard(!showLeaderboard);
//     setGameVisible(!gameVisible);
//   }
//   // 游戏规则
//   const gameRules = (
//     <div className={styles.gameRules}>
//       <p>Welcome to Book Game!</p >
//       <p>It's easier to win by knowing the rules of the game!</p >
//       <p>Here are the rules of the game:</p >
//       <ul>
//         <li>There are 3 questions, each with a time limit of 30 seconds.</li>
//         <li>For every correct answer, you earn one point, which means you may be higher up in the rankings.</li>
//         <li>Don't forget to enter your name, so I can help you rank!</li>
//         {/*<li>If you are our member, we will add your score from the database.!</li>*/}
//         <li>I believe you can't wait, click "START GAME" to start the game!</li>
//         <li>Come on!</li>
//       </ul>
//     </div>
//   );
//   const [gameVisible, setGameVisible] = useState(true);
//
//
//   // useEffect(() => {
//   //   (async () => {
//   //     const leaderboardData = await fetchLeaderboard();
//   //     setLeaderboard(leaderboardData);
//   //   })();
//   // }, []);
//
//
//   function startGame() {
//   setGameStarted(true);
//   }
//
//   useEffect(() => {
//     if (gameStarted) {
//       const countdown = setInterval(() => {
//         if (timer > 0) {
//           setTimer(timer - 1);
//         } else {
//           clearInterval(countdown);
//           setGameStarted(false);
//
//           // let playerName = prompt("Please enter your name:");
//           // setLeaderboard([...leaderboard, { name: playerName, score }]);
//           setPlayerName(prompt("Please enter your name:"));
//           setCurrentQuestion(0);
//           alert("Game over!")
//         }
//       }, 1000);
//       return () => clearInterval(countdown);
//     } else  {
//       setTimer(30);
//
//     }
//   }, [gameStarted, timer]);
//   useEffect(() => {
//     console.log("correctAnswers", correctAnswers);
//     console.log("currentQuestion", currentQuestion);
//
//
//     if (correctAnswers === 3)
//     {alert("Congratulations! You win!")
//     score = score + 1;
//     setCorrectAnswers(0);
//     console.log("score", score);
//     setGameStarted(false);
//     // let playerName = prompt("Please enter your name:");
//     // setLeaderboard([...leaderboard, { name: playerName, score }]);
//     setPlayerName(prompt("Please enter your name:"));
//     setCurrentQuestion(0);
//     alert("Game over!")
//     }
//     else if (currentQuestion === 3 && correctAnswers < 2)
//     {alert("Sorry You didn't win score!")
//     setGameStarted(false);
//     setPlayerName(prompt("Please enter your name:"));
//     setCurrentQuestion(0);
//     }
//
//     }, [correctAnswers,currentQuestion]);
//
//
//   function checkAnswer(option) {
//   if (questions && questions[currentQuestion] && option === questions[currentQuestion].answer) {
//     setCorrectAnswers(correctAnswers + 1);
//   }
//
//   if (questions && currentQuestion < questions.length - 1) {
//     setCurrentQuestion(currentQuestion + 1);
//   }
// }
//
//
//
//
//
//
//
//   function getBadge(score) {
//     // if (score >= 2) {
//     //   return '金牌';
//     // } else if (score >= 1) {
//     //   return '银牌';
//     // } else {
//     //   return '铜牌';
//     // }
//     if (score >= 6) {
//       return 'Grand Master';
//     }
//     else if (score >= 5) {
//       return 'Master';
//     }
//     else if (score >= 4) {
//       return 'Expert';
//     }
//     else if (score >= 3) {
//       return 'Advanced';
//     }
//     else if (score >= 2) {
//       return 'Intermediate';
//     }
//     else if (score >= 1) {
//       return 'Beginner';
//     }else {
//       return 'Newcomer';
//     }
//   }
//
//
//    return (
//     <div className={styles.container}>
//       <div className={styles.mainContent} style={{ display: gameVisible ? 'block' : 'none' }}>
//         {!gameStarted ? (
//           <>
//             {gameRules}
//             {/* <div style={{ display: 'flex' }}>
//               <button onClick={startGame} className={styles.startButton}>
//                 START GAME
//               </button>
//               <div style={{ marginRight: '100px' }}>
//                 <button onClick={toggleLeaderboard} className={styles.startButton}>
//                   查看排行榜
//                 </button>
//               </div>
//             </div> */}
//             <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
//               <button onClick={startGame} className={styles.startButton}>
//                 START GAME
//               </button>
//               <div className={styles.buttonContainer}>
//                 <button onClick={toggleLeaderboard} className={styles.startButton}>
//                   LEADERBOARD
//                 </button>
//               </div>
//             </div>
//           </>
//         ) : (
//         <div>
//           <h1 className={styles.title}>Book question game</h1>
//           <h2 className={styles.question}>remain time:{timer}</h2>
//           <h2 className={styles.correctAnswers}>Correct answer:{correctAnswers}</h2>
//           <h2 className={styles.question}>Quesiton: {questions[currentQuestion].question}</h2>
//
//           {questions[currentQuestion].options.map((option, index) => (
//             <button key={index} onClick={() => checkAnswer(option)} className={styles.optionButton}>
//               {option}
//             </button>
//           ))}
//         </div>
//       )}
//         </div>
//         <div className={styles.leaderboardContainer} style={{ display: showLeaderboard ? 'block' : 'none' }}>
//           <h2 className={styles.title}>Leaderboard</h2>
//           <table className={styles.leaderboard}>
//             <thead>
//               <tr>
//                 <th>Rank</th>
//                 <th>Player</th>
//                 <th>Score</th>
//                 <th>badge</th>
//               </tr>
//             </thead>
//             <tbody>
//               {leaderboard
//                 .sort((a, b) => b.score - a.score)
//                 .map((entry, index) => (
//                   <tr key={index} className={index % 2 === 0 ? styles.leaderboardEvenRow : styles.leaderboardOddRow}>
//                     <td className={styles.leaderboardTd}>{index + 1}</td>
//                     <td className={styles.leaderboardTd}>{entry.name}</td>
//                     <td className={styles.leaderboardTd}>{entry.score}</td>
//                     <td className={styles.leaderboardTd}>{getBadge(entry.score)}</td>
//                   </tr>
//                 ))}
//           </tbody>
//         </table>
//           <button onClick={toggleLeaderboard} className={styles.startButton}>BACK</button>
//         </div>
//       </div>
//   );
// }
//
// export default QuizGame;

import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import styles from "*.module.css";
import fetchFunc from '../service/fetchRequest';
// import styles from 'E:\\capstone_project_9900f16awesley\\project-demo\\src\\QuizGame.module.css'; // 导入样式文件

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
    backgroundImage: "url('https://source.unsplash.com/random?library')",
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    padding: '20px',
  },
  mainContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '20px',
    borderRadius: '5px',
    maxWidth: '600px',
    width: '100%',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
    margin:'80px 0px',
  },
  title: {
    color: '#333',
    fontSize: '36px',
    marginBottom: '20px',
    textAlign: 'center',
  },
  question: {
    color: '#333',
    fontSize: '24px',
    marginBottom: '10px',
    textAlign: 'center',
  },
  optionButton: {
    backgroundColor: '#4caf50',
    border: 'none',
    color: 'white',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    margin: '10px 0',
    cursor: 'pointer',
    borderRadius: '5px',
    padding: '10px 20px',
    width: '100%',
    transition: 'background-color 0.2s ease-in-out',
    '&:hover': {
      backgroundColor: '#45a049',
    },
  },
  optionButtonHover: {
    backgroundColor: '#45a049',
  },
  correctAnswers: {
    color: '#333',
    fontSize: '24px',
    textAlign: 'right',
    alignSelf: 'flex-end',
    marginBottom: '20px',
  },
  leaderboardContainer: {
    marginTop: '20px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '5px',
    padding: '20px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
    maxWidth: '600px',
    width: '100%',
  },
  leaderboardTitle: {
    color: '#333',
    fontSize: '24px',
    marginBottom: '20px',
    textAlign: 'center',
  },
  leaderboard: {
    marginTop: '10px',
    borderCollapse: 'collapse',
    width: '100%',
    fontSize: '18px',
  },
  leaderboardTd: {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'center',
  },
  leaderboardTh: {
    paddingTop: '12px',
    paddingBottom: '12px',
    textAlign: 'center',
    backgroundColor: '#5a5a5a',
    color: '#f0f0f0',
  },
  leaderboardEvenRow: {
    backgroundColor: '#4a4a4a',
  },
  leaderboardOddRow: {
    backgroundColor: '#3a3a3a',
  },
  leaderboardRowHover: {
    backgroundColor: '#2a2a2a',
  },
  startButton: {
    backgroundColor: '#4caf50',
    // border: 'none',
    border: '1px solid #4caf50',
    color: 'white',
    textAlign: 'center',
    textDecoration: 'none',
    // display: 'inline-block',
    display:'flex',
    margin: '0px 20px',
    cursor: 'pointer',
    borderRadius: 5,
    padding: '10px 20px',
    fontSize: '24px',
    transition: 'background-color 0.2s ease-in-out',
    '&:hover': {
      backgroundColor: '#45a049',
    },
  },
  gameRules: {
    textAlign: 'center',
    maxWidth: '600px',
    marginBottom: '30px',
    justifyContent: 'space-between',
    '& p': {
      fontSize: '24px',
      fontWeight: 'bold',
    },
    '& ul': {
      listStyle: 'none',
      padding: '0',
      '& li': {
        fontSize: '20px',
        marginBottom: '10px',
        textAlign: 'left',
        // textIndent: '2em',
        marginLeft:'2em',
        '&:before': {
          content: '"● "',
          color: '#4caf50',
          fontWeight: 'bold',
          display: 'inline-block',
          width: '1em',
          marginLeft: '-1em',
        },
      },
    },
  },
  // button
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
}));

// const questions = [
//   {
//     question: '《哈利·波特与魔法石》的作者是谁？',
//     options: ['A. J.K. 罗琳', 'B. J.R.R. 托尔金', 'C. 乔治·奥威尔', 'D. C.S. 列维'],
//     answer: 'A. J.K. 罗琳',
//   },
//   {
//     question: '《指环王》三部曲的作者是谁？',
//     options: ['A. J.K. 罗琳', 'B. J.R.R. 托尔金', 'C. 乔治·奥威尔', 'D. C.S. 列维'],
//     answer: 'B. J.R.R. 托尔金',
//   },
//   {
//     question: '《动物农场》这部小说的作者是谁？',
//     options: ['A. J.K. 罗琳', 'B. J.R.R. 托尔金', 'C. 乔治·奥威尔', 'D. C.S. 列维'],
//     answer: 'C. 乔治·奥威尔',
//   },
//   // {
//   //   question: '《纳尼亚传奇》系列的作者是谁？',
//   //   options: ['A. J.K. 罗琳', 'B. J.R.R. 托尔金', 'C. 乔治·奥威尔', 'D. C.S. 列维'],
//   //   answer: 'D. C.S. 列维',
//   // },
//   // {
//   //   question: '《百年孤独》的作者是谁？',
//   //   options: ['A. 加西亚·马尔克斯', 'B. 弗朗茨·卡夫卡', 'C. 米兰·昆德拉', 'D. 艾略特'],
//   //   answer: 'A. 加西亚·马尔克斯',
//   // }
// ];
// 假设此函数从数据库获取排行榜数据
// async function fetchLeaderboard() {
//   // 从数据库获取数据并返回
//   return [
//     { name: "player1", score: 5 },
//     { name: "player2", score: 3 },
//     { name: "player3", score: 7 },
//   ];
// }


function QuizGame() {
  const styles = useStyles();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  // const [score, setScore] = useState(0);
  const [score, setScore] = useState(0);
  // console.log("score", score);

  // let score = 0;
  const [timer, setTimer] = useState(30);
  const [leaderboard, setLeaderboard] = useState([]);
  // const [gameEnded, setGameEnded] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  // 隐藏排行榜
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  let [playerName, setPlayerName] = useState(null);
  const [questions, setQuestions] = useState([]);
  

  async function fetchQuestions() {
    try {
      const response = await fetchFunc("/questions/", "POST",{get:"question"})
      const data = await response.json();

      return data.question_list;
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchLeaderboard() {
    try {
      const response = await fetchFunc("/leaderboard/", "POST",{get:"leaderboard"});
      const Data = await response.json();
      return Data.score_list;
    } catch (error) {
      console.log(error);
    }
  }

  async function updatebackendLeaderboard(playerName, score) {
    try {
      // console.log(playerName, score);
      const data = { username: playerName, score: score };
      const response = await fetchFunc("/updateleaderboard/", "POST", data);
      const responseData = await response.json();
      if (responseData.status === "success") {
        // console.log(responseData.new_score)
        setLeaderboard([...leaderboard, { name: playerName, score: responseData.new_score }]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    (async () => {
      const questionsData = await fetchQuestions();
      if (questionsData) {
        setQuestions(questionsData);
      }
      const leaderboardData = await fetchLeaderboard();
      if (leaderboardData) {
        setLeaderboard(leaderboardData);
      }
    })();
  }, []);

  // 在 useEffect 中检查游戏是否已结束，如果是，则调用 updateLeaderboard 函数
  useEffect(() => {
    if (gameStarted === false && playerName !== null && playerName !== "") {
      updatebackendLeaderboard(playerName, score);
    }
  }, [gameStarted, playerName, score]);

  function toggleLeaderboard() {
    setShowLeaderboard(!showLeaderboard);
    setGameVisible(!gameVisible);
  }
  // 游戏规则
  const gameRules = (
      <div className={styles.gameRules}>
        <p>Welcome to Book Game!</p >
        <p>It's easier to win by knowing the rules of the game!</p >
        <p>Here are the rules of the game:</p >
        <ul>
          <li>There are 3 questions, each with a time limit of 30 seconds.</li>
          <li>For every correct answer, you earn one point, which means you may be higher up in the rankings.</li>
          <li>Don't forget to enter your name, so I can help you rank!</li>
          {/*<li>If you are our member, we will add your score from the database.!</li>*/}
          <li>I believe you can't wait, click "START GAME" to start the game!</li>
          <li>Come on!</li>
        </ul>
      </div>
  );
  const [gameVisible, setGameVisible] = useState(true);


  // useEffect(() => {
  //   (async () => {
  //     const leaderboardData = await fetchLeaderboard();
  //     setLeaderboard(leaderboardData);
  //   })();
  // }, []);


  function startGame() {
    setGameStarted(true);
  }

  useEffect(() => {
    if (gameStarted) {
      const countdown = setInterval(() => {
        if (timer > 0) {
          setTimer(timer - 1);
        } else {
          clearInterval(countdown);
          setGameStarted(false);

          // let playerName = prompt("Please enter your name:");
          // setLeaderboard([...leaderboard, { name: playerName, score }]);
          setPlayerName(prompt("Please enter your name:"));
          setCurrentQuestion(0);
          alert("Game over!")
        }
      }, 1000);
      return () => clearInterval(countdown);
    } else  {
      setTimer(30);

    }
  }, [gameStarted, timer]);


  useEffect(() => {
    console.log("correctAnswers", correctAnswers);
    console.log("currentQuestion", currentQuestion);


    if (correctAnswers === 3)
    {alert("Congratulations! You win!")
      // score = score + 1;
      setScore(score+1);
      console.log(score)
      setCorrectAnswers(0);
      setGameStarted(false);

      // let playerName = prompt("Please enter your name:");
      // setLeaderboard([...leaderboard, { name: playerName, score }]);
      setPlayerName(prompt("Please enter your name:"));
      setCurrentQuestion(0);
      alert("Game over!")
    }
    else if (currentQuestion === 3 && correctAnswers !== 3)
    {
      alert("Sorry You didn't win score!")

      setGameStarted(false);
      setPlayerName(prompt("Please enter your name:"));
      setCurrentQuestion(0);
    }

  }, [currentQuestion]);

  // console.log(questions[currentQuestion].answer)
  function checkAnswer(option) {
    console.log(option)
    console.log(questions[currentQuestion].answer)
    if (questions && questions[currentQuestion] && option.substring(0, 3) === questions[currentQuestion].answer.substring(0, 3)) {
      setCorrectAnswers(correctAnswers + 1);












    }
    if (questions && currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  }







  function getBadge(score) {
    // if (score >= 2) {
    //   return '金牌';
    // } else if (score >= 1) {
    //   return '银牌';
    // } else {
    //   return '铜牌';
    // }
    if (score >= 6) {
      return 'Grand Master';
    }
    else if (score >= 5) {
      return 'Master';
    }
    else if (score >= 4) {
      return 'Expert';
    }
    else if (score >= 3) {
      return 'Advanced';
    }
    else if (score >= 2) {
      return 'Intermediate';
    }
    else if (score >= 1) {
      return 'Beginner';
    }else {
      return 'Newcomer';
    }
  }


  return (
      <div className={styles.container}>
        <div className={styles.mainContent} style={{ display: gameVisible ? 'block' : 'none' }}>
          {!gameStarted ? (
              <>
                {gameRules}
                {/* <div style={{ display: 'flex' }}>
              <button onClick={startGame} className={styles.startButton}>
                START GAME
              </button>
              <div style={{ marginRight: '100px' }}>
                <button onClick={toggleLeaderboard} className={styles.startButton}>
                  查看排行榜
                </button>
              </div>
            </div> */}
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                  <button onClick={startGame} className={styles.startButton}>
                    START GAME
                  </button>
                  <div className={styles.buttonContainer}>
                    <button onClick={toggleLeaderboard} className={styles.startButton}>
                      LEADERBOARD
                    </button>
                  </div>
                </div>
              </>
          ) : (
              <div>
                <h1 className={styles.title}>Book question game</h1>
                <h2 className={styles.question}>remain time:{timer}</h2>
                <h2 className={styles.correctAnswers}>Correct answer:{correctAnswers}</h2>
                <h2 className={styles.question}>Quesiton: {questions[currentQuestion].question}</h2>

                {questions[currentQuestion].options.map((option, index) => (
                    <button key={index} onClick={() => checkAnswer(option)} className={styles.optionButton}>
                      {option}
                    </button>
                ))}
              </div>
          )}
        </div>
        <div className={styles.leaderboardContainer} style={{ display: showLeaderboard ? 'block' : 'none' }}>
          <h2 className={styles.title}>Leaderboard</h2>
          <table className={styles.leaderboard}>
            <thead>
            <tr>
              <th>Rank</th>
              <th>Player</th>
              <th>Score</th>
              <th>badge</th>
            </tr>
            </thead>
            <tbody>
            {leaderboard
                .sort((a, b) => b.score - a.score)
                .map((entry, index) => (
                    <tr key={index} className={index % 2 === 0 ? styles.leaderboardEvenRow : styles.leaderboardOddRow}>
                      <td className={styles.leaderboardTd}>{index + 1}</td>
                      <td className={styles.leaderboardTd}>{entry.name}</td>
                      <td className={styles.leaderboardTd}>{entry.score}</td>
                      <td className={styles.leaderboardTd}>{getBadge(entry.score)}</td>
                    </tr>
                ))}
            </tbody>
          </table>
          <button onClick={toggleLeaderboard} className={styles.startButton}>BACK</button>
        </div>
      </div>
  );
}

export default QuizGame;