import React from 'react';
import {useHistory} from 'react-router-dom';
import Fab from '@mui/material/Fab';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import {useNavigate} from 'react-router-dom';
// game icon
const FloatingIconButton = ({targetPage}) => {
    const navigate = useNavigate();
    const handleClick = () => {
        // history.push(targetPage);
        navigate("/gamePage");
    };

    return (
        <div style={{position: 'fixed', top: 150, right: 16}}>
            <Fab color="warning" size="large" aria-label="add" onClick={handleClick} size="large">
                <SportsEsportsIcon/>
            </Fab>
        </div>
    );
};

export default FloatingIconButton;