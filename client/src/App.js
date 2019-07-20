import React from 'react';
import './App.css';
import MainContainer from './Components/MainContainer'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  headline: {
    fontFamily: 'Helvetica, Arial, sans-serif',
    fontWeight: 'bold',
    fontSize: '3em',
    lineHeight: '1em',
    marginBottom:'0.5em',
    marginTop:'0.5em',
  }}));

function App() {
  const classes = useStyles();
  return (
    <div className="App">
      <div className={classes.headline}>tic-tac-toe</div>
      <MainContainer/>
    </div>
  );
}

export default App;
