// src/App.js
import React, {useEffect, useState} from 'react';
import {
    Button,
    TextField,
    Grid,
    Typography,
    Paper,
    Container,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    List,
    ListItem,
    ListItemText, Card, CardContent, Box,
} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import fetchFunc from "../service/fetchRequest";
import {makeStyles} from "@mui/styles";
import Order from "../components/Order";


const useStyles = makeStyles(() => ({
    rootProfile: {
        marginTop: '50px',
        height: '500px',
    },
}));

function Collection() {
    const classes = useStyles();
    const [folders, setFolders] = useState([]);
    const navigate = useNavigate();
    const [folderName, setFolderName] = useState('');
    const [open, setOpen] = useState(false);
    const [selectedFolder, setSelectedFolder] = useState(null);
    const username = localStorage.getItem('user')
    const [currentfolder, setcurrentfolder] = useState('');
    const handleAddFolder = async () => {
        if (folderName.trim() !== '') {
            try {
                const giveInfo = {name: folderName, username: username}
                const response = await fetchFunc('/addNewFolder/', 'POST', giveInfo);
                const data = await response.json();
                console.log(data)
                setOpen(false)
                fetchFolders();

            } catch (error) {
                console.error('add collection fail:', error);
            }
        }
    };


    // ----------真实的fetch请求-----------
    const handleFolderClick = async (folderName) => {
        const FolderAndUser = {name: folderName, username: username}
        console.log(FolderAndUser)
        try {
            const response = await fetchFunc('/clickThisFolder/', 'POST', FolderAndUser);
            const data = await response.json();
            console.log(data);
            setSelectedFolder(data);
            setcurrentfolder(folderName)
        } catch (error) {
            console.error('add collection fail:', error);
        }
    };

    const handleTop10List = async () => {
        const FolderAndUser = {name: currentfolder, username: username}
        console.log(FolderAndUser)
        try {
            const response = await fetchFunc('/getTop10List/', 'POST', FolderAndUser);
            const data = await response.json();
            console.log(data);
            setSelectedFolder(data);
            setcurrentfolder(folderName)
        } catch (error) {
            console.error('Get collection data fail:', error);
        }
    };


    // ----------真实的fetch请求（获取所有收藏夹）-----------
    const fetchFolders = async () => {
        const giveUser = {username: username}
        const response = await fetchFunc('/getAllFolders/', 'POST', giveUser);
        const folderData = await response.json();
        setFolders(folderData);
    }
    console.log(folders)

    useEffect(() => {
        fetchFolders();
    }, [])

    // ----------写死的数据-----------
    // const handleFolderClick = async (id) => {
    //   // 使用静态数据模拟后端响应
    //   const folderData = {
    //     id: id,
    //     name: folders.find((folder) => folder.id === id).name,
    //     items: [
    //       { id: 1, name: '书本1', bookId: 'book1' },
    //       { id: 2, name: '书本2', bookId: 'book2' },
    //     ],
    //   };
    //   setSelectedFolder(folderData);
    // };


    const handleFolderClose = () => {
        setSelectedFolder(null);
        SetSelectedOtherUserFolder(null);
    };

    const handleItemClick = (bookId) => {
        navigate(`/BookDetail/${bookId}`); // 更新为你的书本页面路
    };

    const handlebookdelete = async (bookId, folderName) => {
        const giveBook = {username: username, book_id: bookId, name: folderName}
        const response = await fetchFunc('/deletebookcollection/', 'POST', giveBook);
        const folderData = await response.json();
        if (folderData.message) {
            setSelectedFolder(folderData.book_list);
            console.log(folderData.book_list);
            navigate('/myFav');
        }

    }

    // const handleDelete = (id) => {
    //   console.log(`删除收藏夹:${id}`);
    // }

    //---------------------------一下功能是搜索用户-------------------------
    const [query, setQuery] = useState('');
    const [otherUser, setOtherUser] = useState('');
    const [otherUserFolder, SetOtherUserFolder] = useState(null);
    const [selectedOtherUserFolder, SetSelectedOtherUserFolder] = useState(null);

    // ----------真实的fetch请求(获取其他用户的收藏夹)-----------
    const handleSubmit = async (event) => {
        event.preventDefault();
        // 处理搜索逻辑
        console.log("Search for: ", query);
        setOtherUser(query);
        const otherUser = {username: query}
        console.log(otherUser)
        try {
            const response = await fetchFunc('/getOtherUserFolders/', 'POST', otherUser);
            const data = await response.json();
            console.log(data);
            SetOtherUserFolder(data);
        } catch (error) {
            console.error('fetchData error:', error);
        }
    };

    //真实的fetch
    const handleOtherFolderClick = async (folderName) => {
        const FolderAndUser = {name: folderName, username: otherUser}
        console.log(FolderAndUser)
        try {
            const response = await fetchFunc('/clickOtherUserFolder/', 'POST', FolderAndUser);
            const data = await response.json();
            console.log(data);
            SetSelectedOtherUserFolder(data);
        } catch (error) {
            console.error('fetchData error:', error);
        }
    };

    const handleChange = (event) => {
        setQuery(event.target.value);
    };

    //---------------------------一下功能是发送阅读书本数-------------------------
    const [number, setNumber] = useState('');
    const handleNumberChange = (event) => {
        setNumber(event.target.value);
    };

    const handleBookNumber = async (event) => {
        event.preventDefault();
        // 处理搜索逻辑
        console.log("Search for: ", number);
        const bookNumber = {bookNumber: number, username: username}
        console.log(bookNumber)
        try {
            const response = await fetchFunc('/numberOfBook/', 'POST', bookNumber);
            const data = await response.json();
            console.log(data);
            if (data.message) {
                alert(data.message)
            } else {
                alert('Sent book number success!')
            }
        } catch (error) {
            console.error('fetchData error:', error);
        }
    };

    // const [alreadygodays,setalreadygodays]=useState('')
    // const [remaindays,setremaindays]=useState('')
    const [userGoal, setUserGoal] = useState('');
    const fetchUserGoal = async () => {
        console.log(username)
        const giveUser = {username: username}
        const response = await fetchFunc('/getUserGoal/', 'POST', giveUser);
        const data = await response.json();
        console.log(data)
        setUserGoal(data)
    }


    return (
        // <Container>
    <Paper className={classes.rootProfile}>
        {username && (
            <>
                <Grid container>
                    <Grid item xs={12} md={4}>
                        <Typography variant="h4">My colections</Typography>
                        <Button variant="contained" onClick={() => setOpen(true)}>
                            add to folder
                        </Button>
                        <Grid container spacing={2}>
                            {Object.entries(folders).map(([folderName, items]) => (
                                <Grid item key={folderName} xs={12} sm={6} md={4}>
                                    {items.map(
                                        (folderName) => (
                                            <Paper
                                                elevation={3}
                                                sx={{
                                                    margin: 3,
                                                    padding: 2,
                                                    textAlign: 'center',
                                                    cursor: 'pointer',
                                                }}
                                                onClick={() => handleFolderClick(folderName)}
                                            >
                                                <Typography variant="h6">{folderName}</Typography>
                                            </Paper>
                                        )
                                    )}
                                </Grid>

                            ))}
                        </Grid>
                        <Dialog open={open} onClose={() => setOpen(false)}>
                            <DialogTitle>Add to folder</DialogTitle>
                            <DialogContent>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    label="Folder name..."
                                    value={folderName}
                                    onChange={(e) => setFolderName(e.target.value)}
                                    fullWidth
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setOpen(false)}>取消</Button>
                                <Button onClick={handleAddFolder}>添加</Button>
                            </DialogActions>
                        </Dialog>
                        {selectedFolder && (
                            <Dialog open={true} onClose={handleFolderClose}>
                                <DialogTitle>{selectedFolder.name}</DialogTitle>
                                <DialogContent>

                                    <List>
                                        {Object.entries(selectedFolder.book_list).map(([bookId, bookInfo]) => (
                                            <ListItem
                                                button
                                                key={bookId}
                                                onClick={() => handleItemClick(bookInfo.id)}
                                            >

                                                <ListItemText primary={bookInfo.title} secondary={bookInfo.author}/>
                                                <Button
                                                    type="submit"
                                                    onClick={() => handlebookdelete(bookInfo.id, currentfolder)}
                                                >
                                                    delete
                                                </Button>
                                            </ListItem>
                                        ))}
                                    </List>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleTop10List}>Top 10</Button>
                                </DialogActions>
                                <DialogActions>
                                    <Button onClick={handleFolderClose}>Close</Button>
                                </DialogActions>
                            </Dialog>
                        )}
                    </Grid>


                    {/* -----------------中间部分-------------- */}
                    <Grid item xs={12} md={4}>
                        <Typography variant="h4" component="div">
                            My reading goal is...
                        </Typography>
                        <br/>
                        <form onSubmit={handleBookNumber}>
                            <TextField
                                label="Number of books"
                                variant="outlined"
                                size="small"
                                value={number}
                                onChange={handleNumberChange}
                            />
                            <Button type="submit" variant="contained" color="primary">
                                Enter
                            </Button>
                        </form>
                        <Button variant="contained" color="primary" onClick={fetchUserGoal}>
                            user plan
                        </Button>

                        {userGoal && (<div>
                            <h3>Data:</h3>
                            <ul>
                                <li>Already Go Day: {userGoal.success.already_go_days}</li>
                                <li>Planned Finished Date: {userGoal.success.planned_finish_date}</li>
                                <li>Remain Days: {userGoal.success.remain_days}</li>
                            </ul>
                        </div>)}


                        <br/>

                    </Grid>

                    {/* -----------------右边部分-------------- */}
                    <Grid item xs={12} md={4}>
                        <Typography variant="h4" component="div">
                            Search other user colletions
                        </Typography>
                        <br/>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Search"
                                variant="outlined"
                                size="small"
                                value={query}
                                onChange={handleChange}
                            />
                            <Button type="submit" variant="contained" color="primary">
                                Search
                            </Button>
                        </form>
                        {/* -----------展示其他用户的收藏夹----------- */}
                        {otherUserFolder &&
                            (Object.entries(otherUserFolder).map(([folderName, items]) => (
                                <Grid item key={folderName} xs={12} sm={6} md={4}>
                                    {items.map(
                                        (folderName) => (
                                            <Paper
                                                elevation={3}
                                                sx={{
                                                    margin: 3,
                                                    padding: 2,
                                                    textAlign: 'center',
                                                    cursor: 'pointer',
                                                }}
                                                onClick={() => handleOtherFolderClick(folderName)}
                                            >
                                                <Typography variant="h6">{folderName}</Typography>
                                            </Paper>
                                        )
                                    )}

                                </Grid>
                            )))
                        }
                        {/* -----------展示其他用户的收藏夹内容----------- */}
                        {selectedOtherUserFolder && (
                            <Dialog open={true} onClose={handleFolderClose}>
                                <DialogTitle>{selectedOtherUserFolder.name}</DialogTitle>
                                <DialogContent>

                                    <List>
                                        {Object.entries(selectedOtherUserFolder.book_list).map(([bookId, bookInfo]) => (
                                            <ListItem
                                                button
                                                key={bookId}
                                                onClick={() => handleItemClick(bookInfo.id)}
                                            >

                                                <ListItemText primary={bookInfo.title} secondary={bookInfo.author}/>
                                            </ListItem>
                                        ))}
                                    </List>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleFolderClose}>Close</Button>
                                </DialogActions>
                            </Dialog>
                        )}
                        {/* ---------------------------------- */}
                    </Grid>
                </Grid>
            </>)
        }
        {!username && (
            <Typography variant="h4" component="div">
                You need to login first
            </Typography>
        )
        }
    </Paper>
    );
}

export default Collection;