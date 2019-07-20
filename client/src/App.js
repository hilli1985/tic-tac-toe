import React from 'react';
import './App.css';
import {makeStyles} from '@material-ui/core/styles';
import MainContainer from './Components/MainContainer';

// eslint-disable-next-line no-unused-vars
const useStyles = makeStyles(theme => ({
    headline: {
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontWeight: 'bold',
        fontSize: '3em',
        lineHeight: '1em',
        marginBottom: '0.5em',
        marginTop: '0.5em',
    },
}));

function App() {
    const classes = useStyles();
    return (
        // eslint-disable-next-line react/jsx-filename-extension
        <div className="App">
            <div className={classes.headline}>tic-tac-toe</div>
            <MainContainer />
        </div>
    );
}

export default App;
