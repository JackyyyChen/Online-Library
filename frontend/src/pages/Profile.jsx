import React from 'react';
import {makeStyles} from '@mui/styles';
// import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {Button, CardMedia, Modal, TextField} from '@mui/material';
import {useState} from 'react';
import fetchFunc from '../service/fetchRequest';
import {fileToDataUrl} from '../service/sendImage';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import {useEffect} from 'react';
// import { useEffect } from 'react';


const useStyles = makeStyles(() => ({
    rootProfile: {
        marginTop: '50px',
        height: '500px',
    },
    name: {
        // marginTop: '20px',
        // fontWeight: 'bold',
    },
    userName: {
        // marginTop: '20px',
        fontWeight: 'bold',
    },
    userEmail: {
        // marginTop: '20px',
        fontWeight: 'bold',
    },
    email: {
        // marginTop: '20px',
    },
    bio: {
        // marginTop: '30px',
        height: '100%',
        width: '100%',
    },
    paper: {
        gap: '30px',
    }
}));

const ProfilePage = () => {
    const classes = useStyles();
//   const user = localStorage.getItem('user');
//   console.log(user);
//     const handleEdit = () => {
//     // Add book to cart
//     alert('go Edit');
//   };
//   make a request to get user info
    const [open, setOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    const [bio, setBio] = useState('');

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleBioChange = (event) => {
        setBio(event.target.value);
    };
    //handle submit
    const handleSubmit = async (event) => {
        event.preventDefault();
        const userInfo = {username: username, email: email, bio: bio};
        const response = await fetchFunc('/profile/edit/', 'POST', userInfo)
        const data = await response.json();
        if (data.error) {
            alert(data.error);
        } else {
            alert(data.success);

        }
        handleClose();
    };

    // if there is no user, redirect to login page
    const userName = localStorage.getItem('user')
    console.log('userName', userName)
    const userInfo = {username: userName}
    // ===================request请求=============================
    const [result, setResult] = useState([]);

    useEffect(() => {
        fetchFunc('/profile/', 'POST', userInfo)
            .then(response => response.json())
            .then(result => setResult(result)
            );
    }, []);
    console.log('result', result)


    ///----------------------------------------------------------------
    const [Inputimage, setInputImage] = React.useState('')
    const [userImg, setUserImg] = React.useState('')
    // file change
    const handleFileChange = (e) => {
        setInputImage(e.target.files)
    }
    // upload file
    const filesContent = (function () {
        if (Inputimage.length !== 0) {
            console.log('passed');
            let UploadImage = ''
            for (let i = 0; i < Inputimage.length; i++) {
                UploadImage += ` ${Inputimage[i].name}`
            }
            return <Typography> Files are{UploadImage} </Typography>
        }
    })()
    // upload image
    const handleUpload = () => {
        let ExistThumbnail = ''
        const data = {name: userName, thumbnail: ''}
        for (let i = 0; i < Inputimage.length; i++) {
            fileToDataUrl(Inputimage[i]).then((res) => {
                ExistThumbnail += `${res} `
                if (i === Inputimage.length - 1) {
                    data.thumbnail = ExistThumbnail
                    console.log('upload img', data);
                    setUserImg(data.thumbnail);
                    fetchFunc('/uploadimage/', 'POST', data)
                        .then(response => response.json())
                        .then((data) => {
                            setUserImg(data.url);
                            console.log('return data', data);

                        })
                        .catch((err) => {
                            alert('Error', err)
                        })
                }
            })
        }
    }
///----------------------------------------------------------------

    return (
        <Paper className={classes.rootProfile}>
            {userName && (
                <>
                    <Grid container>
                        <Grid item xs={12} md={6}>
                            <Box>

                                <Grid item xs={12} md={4}>
                                    <div>
                                        {/* <Avatar src={userImg} sx={{ width: 100, height: 100 }} /> */}
                                        <Avatar src={result.image} sx={{width: 100, height: 100}}/>
                                        {/* <input type="file" onChange={handleFileChange} /> */}
                                        <input
                                            accept='image/jpeg,image/png,image/jpg'
                                            // className={styles.input}
                                            id='upload-file'
                                            multiple
                                            type='file'
                                            onChange={handleFileChange}
                                        />
                                        {Inputimage.length === 0 && (<Typography> No file </Typography>)}
                                        {Inputimage.length !== 0 && filesContent}
                                        <Button variant='contained'
                                                color='primary'
                                                component='span'
                                                onClick={handleUpload}>Upload profile photo</Button>
                                        {/* <Button variant="contained" onClick={handleUpload}>
              上传头像
            </Button> */}
                                    </div>
                                </Grid>


                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box>

                                <Grid item xs={12} md={8}>

                                    <Typography variant="h3" className={classes.userName}>
                                        User Name:
                                    </Typography>
                                    <Typography variant="h4" className={classes.name}>
                                        {result.name}
                                    </Typography>
                                    <br/>
                                    <Typography variant="h3" className={classes.userEmail}>
                                        Email:
                                    </Typography>
                                    <Typography variant="h5" className={classes.email}>
                                        {result.email}
                                    </Typography>
                                    <br/>
                                    <Typography variant="h3" className={classes.userBio}>
                                        Bio:
                                    </Typography>
                                    <Typography variant="body1" className={classes.bio}>
                                        {result.bio}
                                    </Typography>
                                    <Button variant="contained" onClick={handleOpen}>
                                        Edit my profile
                                    </Button>
                                    <div className={classes.paper}>
                                        <Modal open={open} onClose={handleClose}>
                                            <div style={{
                                                margin: 'auto',
                                                marginTop: 50,
                                                width: 400,
                                                background: 'white',
                                                padding: 16
                                            }}>
                                                <form onSubmit={handleSubmit}>
                                                    <TextField label="User name" value={username}
                                                               onChange={handleUsernameChange} fullWidth/>
                                                    <TextField label="Email" value={email} onChange={handleEmailChange}
                                                               fullWidth/>
                                                    {/* <TextField label="密码" value={password} type="password" onChange={handlePasswordChange} fullWidth /> */}
                                                    <TextField label="Bio" value={bio} type="bio"
                                                               onChange={handleBioChange} fullWidth/>
                                                    <div style={{marginTop: 16}}>
                                                        <Button type="submit" variant="contained" color="primary"
                                                                fullWidth>
                                                            Edit
                                                        </Button>
                                                    </div>
                                                </form>
                                            </div>
                                        </Modal>
                                    </div>

                                </Grid>

                            </Box>
                        </Grid>
                    </Grid>


                </>
            )}

            {!userName && (
                <Typography variant="h4" component="div">
                    You need to login first
                </Typography>
            )}
        </Paper>
    );
};

export default ProfilePage;