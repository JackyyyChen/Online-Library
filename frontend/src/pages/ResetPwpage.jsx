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
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import '../SignUp.css';


const theme = createTheme();

export default function SignUp() {

  // const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [PasswordError, setPasswordError] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  // const [email, ]
  const [message, setMessage] = useState('');
  // const [token, setToken] = useState('');
  const [confirmToken, setConfirmToken] = useState('');
  const [tokenError, setTokenError] = useState(false);
  console.log(confirmToken);

  //发送所有信息到后端，通过更改
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username) {
      // setMessage('请输入用户名');
      setUsernameError(true); // 将输入框变为红色
      return;
    }
    if (!password) {
      // setMessage('请输入新密码');
      setPasswordError(true);
      return;
    }
    // if (password === confirmPassword) {
    //   setPasswordError(false);
    //   setConfirmPasswordError(false);
    // }
    if (password !== confirmPassword) {
      setConfirmPasswordError(true);
      // setMessage('两次密码输入不一致');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      // message.error('Invalid email');
      // return;
      setEmailError(true);
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
        alert(recieve.error);
        // setMessage('获得验证码失败')
    } else {
      alert('Changed password successed！')
        // localStorage.removeItem('code');
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
    const userEmail = { username: username,email: email }
    console.log('111',userEmail)
    setMessage('Already sent, please check your email!')
    const response = await fetchFunc('/getCode/', 'POST', userEmail)
    const data= await response.json();
    if (data.error) {
        // alert('error:', recieve.error);
        // setMessage(recieve.error)
        alert('get security code fail')
    } else {
        alert('Get security code successed! Please check your email')
        localStorage.setItem('code', data.code);
    }
  };

  return (
    <div className="backgroundContainer">
    <>
      <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs" >
          <CssBaseline />
          <Box
            className="formContainer"
            sx={{
              // marginTop: 8,
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
              Reset Password
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>

  {/* -------------------------------------------- */}
              <Grid item xs={12}>
                <TextField
                    label="Username"
                    type="text"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      if (usernameError) {
                        setUsernameError(false);
                      }
                    }}
                    // onChange={(e) => setUsername(e.target.value)}
                    required
                    fullWidth
                    error={usernameError} // 根据 error 属性来控制输入框和提示信息的颜色
                    helperText={usernameError ? 'Username cannot be empty!' : ''}

                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    label="New Password"
                    type={showPassword ? 'text' : 'password'}
                    // type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (PasswordError) {
                        setPasswordError(false);
                      }
                    }}
                    // onChange={(e) => setPassword(e.target.value)}
                    sx={{ width: '100%' }}
                    required
                    error={PasswordError} // 根据 error 属性来控制输入框和提示信息的颜色
                    helperText={PasswordError ? 'The new password cannot be empty!' : ''}
                    InputProps={{
                      // 使用 InputAdornment 组件将 IconButton 添加到输入框的最右侧
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                  label="Confirm New Password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  // type="password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (confirmPasswordError) {
                      setConfirmPasswordError(false);
                    }
                  }}
                  // onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  error={confirmPasswordError} // 根据 error 属性来控制输入框和提示信息的颜色
                  helperText={confirmPasswordError ? 'Two times the password input does not match!' : ''}

                  sx={{ width: '100%' }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                </Grid>
                {/* -------------------------------------------- */}

                {/* fetch获得验证码 */}
                <Grid item xs={12}>
                {/* <form> */}
                <TextField
                    label="Your Email"
                    type="text"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (emailError) {
                        setEmailError(false);
                      }
                    }}
                    // onChange={(e) => setEmail(e.target.value)}
                    required
                    sx={{ width: '100%' }}
                    error={emailError} // 根据 error 属性来控制输入框和提示信息的颜色
                    helperText={emailError ? 'Invalid email!' : ''}

                />
                  <Button variant="contained" onClick={sentEmail}>
                    get code
                  </Button>
                {/* </form> */}
                </Grid>
              {/* -------------------------------------------- */}
                <Grid item xs={12}>
                  <TextField
                    label="Verification Code"
                    variant="outlined"
                    value={confirmToken}
                    onChange={handleChange}
                    fullWidth
                  />
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
      </div>
  );
}