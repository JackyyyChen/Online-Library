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
import {createTheme, ThemeProvider} from '@mui/material/styles';
import fetchFunc from '../service/fetchRequest';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import {useState} from 'react';
import {IconButton, InputAdornment, FormHelperText} from '@mui/material';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import '../SignUp.css';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright  '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function SignUp(props) {
    //declare state
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [FNError, setFNError] = useState(false);
    const [LNError, setLNError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const resetErrors = () => {
        setFNError(false);
        setLNError(false);
        setEmailError(false);
        setPasswordError(false);
        setConfirmPasswordError(false);
    };
    //fetch submit data
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const FN = data.get('firstName');
        const LN = data.get('lastName');
        const email = data.get('email')
        console.log({
            username: FN + LN,
            email: data.get('email'),
            password1: data.get('password'),
            password2: data.get('ConfirmPassword'),
        });
        const userInfo = {email: data.get('email'), password: data.get('password'), username: FN + LN};
        // const userInfoJSON = JSON.stringify(userInfo);

        resetErrors();

        if (!FN) {
            console.log('wrong');
            setFNError(true);
            // alert('Please input your full name!')
        } else if (!LN) {
            console.log('wrong');
            setLNError(true);
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            // message.error('Invalid email');
            // return;
            console.log('wrong');
            setEmailError(true);
            // alert('Invalid email')
        } else if (!data.get('password') || !data.get('ConfirmPassword') || data.get('password') !== data.get('ConfirmPassword')) {
            console.log('wrong');
            setPasswordError(true);
            setConfirmPasswordError(true);
            // alert('Please enter same password twice')
        } else {
            // ===================request请求=============================
            const response = await fetchFunc('/register/', 'POST', userInfo)
            const data = await response.json();
            if (data.error) {
                alert(data.error);
            } else {
                alert(data.success);

                localStorage.setItem('user', JSON.stringify(userInfo))
                props.setUser(userInfo);
            }
        }
    };

    return (
        <div className="backgroundContainer">
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline/>
                    <Box
                        className="formContainer"
                        sx={{
                            // marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            // opacity: 1,
                        }}
                    >
                        <Avatar sx={{m: 1, bgcolor: 'primary.main'}}>
                            {/* <LockOutlinedIcon /> */}
                            <PersonAddAlt1Icon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        error={FNError}
                                        autoComplete="given-name"
                                        name="firstName"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                    />
                                    {FNError && (
                                        <FormHelperText error>
                                            Please input your first name!
                                        </FormHelperText>
                                    )}
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        error={LNError}
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="family-name"
                                    />
                                    {LNError && (
                                        <FormHelperText error>
                                            Please input your last name!
                                        </FormHelperText>
                                    )}
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        error={emailError}
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                    />
                                    {emailError && (
                                        <FormHelperText error>
                                            Invalid email!
                                        </FormHelperText>
                                    )}
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        error={passwordError}
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type={showPassword ? 'text' : 'password'}
                                        // type="password"
                                        id="password"
                                        autoComplete="new-password"
                                        value={props.value}
                                        onChange={props.onChange}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                                                        {showPassword ? <VisibilityOff/> : <Visibility/>}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    {passwordError && (
                                        <FormHelperText error>
                                            The password entered twice must be the same and cannot be empty!
                                        </FormHelperText>
                                    )}
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        error={confirmPasswordError}
                                        required
                                        fullWidth
                                        name="ConfirmPassword"
                                        label="ConfirmPassword"
                                        // type="password"
                                        id="ConfirmPassword"
                                        autoComplete="confirm-password"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        // type="password"
                                        value={props.value}
                                        onChange={props.onChange}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                                        {showConfirmPassword ? <VisibilityOff/> : <Visibility/>}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    {confirmPasswordError && (
                                        <FormHelperText error>
                                            Please enter the same password twice
                                        </FormHelperText>
                                    )}
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                            >
                                Sign Up
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href="/login" variant="body2">
                                        Already have an account? Sign in
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    <Copyright sx={{mt: 5}}/>
                </Container>
            </ThemeProvider>
        </div>
    );
}