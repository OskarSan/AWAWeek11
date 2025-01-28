import React from "react";
import './Header.css';
import { AppBar, Button, Toolbar, Typography} from '@mui/material';
import { Link } from 'react-router-dom';


const Header: React.FC = () => {
    return (   

        <AppBar position="static" className="appBar">
            <Toolbar className="toolbar">
                <Typography variant="h6" className="header-title">
                    News App
                </Typography>
                <Button color="inherit" component={Link} to="/">Home</Button>
                <Button color="inherit" component={Link} to="/saved">Saved</Button>
            </Toolbar>

        </AppBar>
    );
};

export default Header;  