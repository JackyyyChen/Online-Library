import React from 'react';
import { makeStyles } from '@mui/styles';
// import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Button, CardMedia, Modal, TextField } from '@mui/material';
import { useState } from 'react';
import fetchFunc from '../service/fetchRequest';
import { fileToDataUrl } from '../service/sendImage';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { useEffect } from 'react';
// import { useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import '../index.css'






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
  },
  gridContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  tableWithMargin: {
    marginTop: '100px',
  },
  tableContainer: {
    width: '100%',
    height: '100%',
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
//   ===================制作弹窗，更改用户信息=======================
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
  // const handlePasswordChange = (event) => {
  //   setPassword(event.target.value);
  // };
  const handleBioChange = (event) => {
    setBio(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // 在这里处理表单提交逻辑
    console.log('提交表单:', { username, email,bio});
    // const userInfo = { oldname: oldname, username: username, email: email };
    const userInfo = { username: username, email: email, bio: bio };
    const response = await fetchFunc('/profile/', 'POST', userInfo)
      const data = await response.json();
      if (data.error) {
        alert(data.error);
      } else {
        alert(data.success);

      }
    handleClose();
  };

  //判断是否登陆，需要确定是否有user
  const userName = localStorage.getItem('user')
  console.log('userName',userName)
  // ===================request请求=============================
  const [data, setData] = useState([]);


  const userInfo = {username: userName}
  // ===================request请求=============================
  const [result, setResult] = useState([]);

  useEffect(() => {
    fetchFunc('/profile/', 'POST', userInfo)
      .then(response => response.json())
      .then(result => setResult(result)
            );
  }, []);
  console.log('result',result)

  // const data = [
  //   {
  //     name: 'abc',
  //     email: 'abc@unsw.com',
  //     image: 'http://images.amazon.com/images/P/0195153448.01.LZZZZZZZ.jpg',
  //     bio: 'I am good',
  //   },
  // ];

  ///----------------------------------------------------------------
  const [Inputimage, setInputImage] = React.useState('')
  const [userImg, setUserImg] = React.useState('')

  // const handleFileChange = (e) => {
  //   setInputImage(e.target.files)
  // }
  //上传图片
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

  const handleUpload = () => {
    let ExistThumbnail = ''
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
            alert('Error',err)
          })
        }
      })
  }
  }

  // 点击头像上传图片
  const fileInputRef = React.createRef();
  const handleFileChange = async (e) => {
    setInputImage(e.target.files);

    let ExistThumbnail = '';
    for (let i = 0; i < e.target.files.length; i++) {
      // eslint-disable-next-line no-await-in-loop
      const res = await fileToDataUrl(e.target.files[i]);
      ExistThumbnail += `${res} `;
      if (i === e.target.files.length - 1) {
        data.thumbnail = ExistThumbnail;
        setUserImg(data.thumbnail);
      }
    }
  };


  const handleClickAvatar = () => {
    fileInputRef.current.click();
  };



///----------------------------------------------------------------

return (
  <Paper className={classes.rootProfile}>
    {!userName && (
      <>
        <Grid container direction="row" alignItems="center">
        {/* <Grid container direction="column" > */}
          <Grid item xs={6} container justifyContent="center" alignItems="center">
          {result.map((result) => (
            <div key={result.name}>
              <Avatar
                src={userImg}
                sx={{ width: 200, height: 200 }}
                onClick={handleClickAvatar} // 添加点击事件
              />
              <input
                accept="image/jpeg,image/png,image/jpg"
                id="upload-file"
                multiple
                type="file"
                onChange={handleFileChange}
                ref={fileInputRef} // 添加引用
                hidden // 隐藏文件选择器
              />
              {/* <Button
                variant="contained"
                color="primary"
                component="span"
                onClick={handleUpload}
              >
                上传头像
              </Button> */}
            </div>
          ))}

          </Grid>
          <Grid item xs={6}>
            {result.map((result) => (
              <Grid container key={result.name} className={`${classes.gridContainer} ${classes.tableWithMargin}`}>
              {/* <Grid container key={data.name} className={classes.gridContainer}> */}
                <Grid item xs={10} >
                  {/* <Box width="100%"> */}
                    <TableContainer component={Paper} className={classes.tableContainer}>
                      <Table>
                        <TableBody>
                          <TableRow>
                            <TableCell>
                              <Typography variant="h3" className={classes.userName} style={{ fontSize: '24px' }}>
                                User Name:
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="h4" className={classes.name} style={{ fontSize: '24px' }}>
                                {result.name}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <Typography variant="h3" className={classes.userEmail} style={{ fontSize: '24px' }}>
                                Email:
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="h5" className={classes.email} style={{ fontSize: '24px' }}>
                                {result.email}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <Typography variant="h3" className={classes.userBio} style={{ fontSize: '24px' }}>
                                Bio:
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="body1" className={classes.bio} style={{ fontSize: '24px' }}>
                                {result.bio}
                              </Typography>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  {/* </Box> */}
                  <Button variant="contained" onClick={handleOpen}>
                    Edit my profile
                  </Button>
                  <div className={classes.paper}>
                    <Modal open={open} onClose={handleClose}>
                      <div style={{ margin: 'auto', marginTop: 50, width: 400, background: 'white', padding: 16 }}>
                        <form onSubmit={handleSubmit}>
                          <TextField label="用户名" value={username} onChange={handleUsernameChange} fullWidth />
                          <TextField label="邮箱" value={email} onChange={handleEmailChange} fullWidth />
                          <TextField label="个性签名" value={bio} type="bio" onChange={handleBioChange} fullWidth />
                          <div style={{ marginTop: 16 }}>
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                              Edit
                            </Button>
                          </div>
                        </form>
                      </div>
                    </Modal>
                  </div>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </>
    )}

      {!userName && (
            <>
              <div>You need to login first!</div>
            </>
          )}
    </Paper>
  );
};

export default ProfilePage;