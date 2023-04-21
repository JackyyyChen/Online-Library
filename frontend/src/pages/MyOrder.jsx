import React, {useState, useEffect} from 'react';
import Order from '../components/Order';
import fetchFunc from "../service/fetchRequest";
import {Typography, Paper} from "@mui/material";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles(() => ({
    rootProfile: {
        marginTop: '50px',
        height: '500px',
    },
}));

const YourOrders = () => {
    const classes = useStyles();
    const [orders, setOrders] = useState([]);
    const [sortOrder, setSortOrder] = useState([]);
    const [userExist, setUserExist] = useState('')


    const fetchOrders = async () => {
        const user = localStorage.getItem('user')
        setUserExist(user)
        const userName = {username: user}
        console.log(userName)
        // try {
        const response = await fetchFunc('/getOrder/', 'POST', userName);
        const data = await response.json();
        setOrders(data);
        // } catch (error) {
        //   console.error('Error fetching orders:', error);
        // }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    console.log(orders)
    useEffect(() => {
        if (orders.order_list) {
            setSortOrder(Object.values(orders.order_list));
        }
        console.log('111', setSortOrder)
    }, [orders]);
    console.log(sortOrder)


    const deleteOrder = async (orderId) => {
        // alert(orderId);
        const user = localStorage.getItem('user')
        const fetchInfo = {username: user, order_id: orderId}
        try {
            const response = await fetchFunc('/deletOrder/', 'POST', fetchInfo);
            console.log('response', response);
            const data = await response.json();
            console.log('data', data);
            if (data.message) {
                alert(data.message)
            }
            await fetchOrders();


            // if (response.statusCode === 200) {
            //   fetchOrders();
            // }
        } catch (error) {
            console.error('Error deleting order:', error);
        }
    };

    return (
        <Paper className={classes.rootProfile}>
            {userExist && (
                <>
                    <div>
                        <h2>My order</h2>
                        {sortOrder.map((order) => (
                            <Order key={order.id} order={order} onDelete={deleteOrder}/>
                        ))}
                    </div>
                </>)
            }
            {!userExist && (
                <Typography variant="h4" component="div">
                    You need to login first
                </Typography>
            )
            }
        </Paper>
    );
};

export default YourOrders;