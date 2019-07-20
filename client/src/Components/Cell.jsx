import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const classNames = require('classnames');

const gameIcons = {
    none: '_',
    x: 'X',
    o: 'O',
};

const useStyles = makeStyles(theme => ({
    cell: {
        textAlign: 'center',
        margin: '4px',
        width: '5vw',
        height: 'auto',
        padding: '10px',
        borderRadius: '3px !important',
        [theme.breakpoints.down('sm')]: {
            height: '5.5vh',
            width: '5.5vh',
            padding: '10px',
            margin: '2px',
        },
    },
    icon: {
        textAlign: 'center',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontWeight: 'bold',
        lineHeight: '1em',
        fontSize: '3em',
        verticalAlign: 'middle',
    },
    x_icon: {
        color: '#282C34',
    },
    o_icon: {
        color: '#1CA8FC',
    },
    none_icon: {
        color: '#FFFFFF',
    },
}));

function Sign(props) {
    const classes = useStyles();
    return (
        <div
            className={classNames(classes[props.sign + '_icon'], classes.icon)}
        >
            {gameIcons[props.sign]}
        </div>
    );
}

export default function Cell(props) {
    const classes = useStyles();
    const {col, row, sign, play} = props;
    return (
        <Grid container justify="center">
            <Grid onClick={() => play(row, col)} item xs={12}>
                <Paper className={classes.cell}>
                    <Sign sign={sign} />
                </Paper>
            </Grid>
        </Grid>
    );
}
