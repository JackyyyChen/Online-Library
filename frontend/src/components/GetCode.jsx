import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import fetchFunc from '../service/fetchRequest';
import ModeIcon from '@mui/icons-material/Mode';
import {useState} from 'react';

const theme = createTheme();

export default function SignUp() {

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');


    //send email to backend
    const handleSubmit = async (e) => {
        e.preventDefault();
        const userInfo = {email: email}
        console.log('111', userInfo)
        setMessage('获得验证码失败')
        // const response = await fetchFunc('/getCode/', 'Get', userInfo)
        // const recieve= await response.json();
        // if (recieve.error) {
        //     // alert('error:', recieve.error);
        //     // setMessage(recieve.error)
        //     setMessage('获得验证码失败')
        // } else {
        //     setMessage('你已获得验证码！请查看你的邮箱')
        //     // localStorage.setItem('code', receive.code);
        //     // navigate("/resetPW");
        // }
    };

    return (
        <>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline/>
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{m: 1, bgcolor: 'primary.main'}}>
                            {/* <LockOutlinedIcon /> */}
                            <ModeIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Enter your email
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Your email"
                                        type="text"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </Grid>
                                {message && <Typography>{message}</Typography>}
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{mt: 3, mb: 2}}
                                >
                                    submit
                                </Button>
                            </Grid>
                            <br/>

                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href="/resetPW" variant="body2">
                                        Go back to ResetPassword
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