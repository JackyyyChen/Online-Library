// import * as React from 'react';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import Link from '@mui/material/Link';
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
// // import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import fetchFunc from '../service/fetchRequest';
// import ModeIcon from '@mui/icons-material/Mode';
//
// function Copyright(props) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }
//
// const theme = createTheme();
//
// export default function SignUp(props) {
//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);
//     const userInfo = { username: data.get('username'), password: data.get('password') };
//     console.log(userInfo);
//     // const userInfoJSON = JSON.stringify(userInfo);
//     if (data.get('password') !== data.get('ConfirmPassword')) {
//       console.log('wrong');
//       alert('Please enter same password twice')
//     } else if (data.get('password') === '' || data.get('ConfirmPassword') === '') {
//       alert('Password can not be empty')
//     }
//     else {
//       // alert('YEEAAAHHH')
//       // ===================request请求=============================
//       const response = await fetchFunc('/resetPW/', 'POST', userInfo)
//       const data = await response.json();
//       if (data.error) {
//         alert(data.error);
//       } else {
//         alert(data.success);
//         // const user = localStorage.getItem('user')
//         // if (user !== data.get('username')){
//         //   localStorage.removeItem('user')
//         // }
//         // localStorage.setItem('user',  data.get('username'))
//         // localStorage.setItem('user', userInfo)
//
//         // props.setUser(userInfo);
//       }
//     }
//   };
//
//   return (
//     <>
//     <ThemeProvider theme={theme}>
//         <Container component="main" maxWidth="xs" >
//         <CssBaseline />
//         <Box
//           sx={{
//             marginTop: 8,
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//           }}
//         >
//           <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
//             {/* <LockOutlinedIcon /> */}
//             <ModeIcon/>
//           </Avatar>
//           <Typography component="h1" variant="h5">
//             Reset password
//           </Typography>
//           <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
//             <Grid container spacing={2}>
//               <Grid item xs={12}>
//                 <TextField
//                   required
//                   fullWidth
//                   id="username"
//                   label="Username"
//                   name="username"
//                   autoComplete="username"
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   required
//                   fullWidth
//                   name="password"
//                   label="Password"
//                   type="password"
//                   id="password"
//                   autoComplete="new-password"
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   required
//                   fullWidth
//                   name="ConfirmPassword"
//                   label="ConfirmPassword"
//                   type="password"
//                   id="ConfirmPassword"
//                   autoComplete="confirm-password"
//                 />
//               </Grid>
//             </Grid>
//             <br />
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{ mt: 3, mb: 2 }}
//             >
//               Reset
//             </Button>
//             <Grid container justifyContent="flex-end">
//               <Grid item>
//                 <Link href="/login" variant="body2">
//                   Go back to login
//                 </Link>
//               </Grid>
//             </Grid>
//           </Box>
//         </Box>
//         <Copyright sx={{ mt: 5 }} />
//         </Container>
//     </ThemeProvider>
//     </>
//   );
// }

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import fetchFunc from '../service/fetchRequest';
import ModeIcon from '@mui/icons-material/Mode';
import { useState } from 'react';
// import {useNavigate} from 'react-router-dom';

const theme = createTheme();

export default function SignUp() {

  // const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  // const [token, setToken] = useState('');
  const [confirmToken, setConfirmToken] = useState('');
  console.log(confirmToken);

  //发送所有信息到后端，通过更改
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      // setMessage('两次密码输入不一致');
      alert('两次密码输入不一致');
      return;
    }
    // if (token !== confirmToken) {
    //   // setMessage('两次密码输入不一致');
    //   alert('验证码不正确！');
    //   return;
    // }
    const userInfo = { username: username, password: password, token: confirmToken }
    console.log('111',userInfo)
    const response = await fetchFunc('/resetPW/', 'POST', userInfo)
    const recieve= await response.json();
    if (recieve.error) {
      console.log('error:', recieve.error);
        alert('Error:', recieve.error);
        // setMessage('获得验证码失败')
    } else {
      alert('更改成功！')
        localStorage.removeItem('code');
    }
  };

  // const GoToGetCode = () => {
  //   navigate("/getCode");
  // }

  //输入token
  const handleChange = (e) => {
    setConfirmToken(e.target.value);
  };

  console.log('token是：',confirmToken)
  //发送email到后端，获取验证码
  const sentEmail = async (e) => {
    e.preventDefault();
    const userEmail = { email: email }
    console.log('111',userEmail)
    setMessage('已发送，请查看你的邮箱')
    const response = await fetchFunc('/getCode/', 'POST', userEmail)
    const data= await response.json();
    if (data.error) {
        // alert('error:', recieve.error);
        // setMessage(recieve.error)
        alert('获得验证码失败')
    } else {
        alert('你已获得验证码！请查看你的邮箱')
        // localStorage.setItem('code', data.code);
    }
  };

  return (
    <>
    <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs" >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            {/* <LockOutlinedIcon /> */}
            <ModeIcon/>
          </Avatar>
          <Typography component="h1" variant="h5">
            Reset password
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>

{/* -------------------------------------------- */}
            <Grid item xs={12}>
              <TextField
                  label="用户名"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
              />
              </Grid>
              <Grid item xs={12}>
              <TextField
                  label="新密码"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
              />
              </Grid>
              <Grid item xs={12}>
              <TextField
                label="确认新密码"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="输入验证码"
                  variant="outlined"
                  value={confirmToken}
                  onChange={handleChange}
                />
              </Grid>
{/* -------------------------------------------- */}

                    {/* fetch获得验证码 */}
                    <Grid item xs={12}>
              <form>
              <TextField
                  label="Your email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
              />
                 <Button variant="contained" onClick={sentEmail}>
                  get code
                </Button>
              </form>
              </Grid>
            {message && <Typography>{message}</Typography>}
            {/* <Button
              // type="submit"
              fullWidth
              variant="contained"
              onClick={GoToGetCode}
              sx={{ mt: 3, mb: 2 }}
            >
              获得验证码
            </Button> */}
              <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
                submit
            </Button>
            </Grid>
            <br />

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Go back to login
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        </Container>
    </ThemeProvider>
    </>
  );
}