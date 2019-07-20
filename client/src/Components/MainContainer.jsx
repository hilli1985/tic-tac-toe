import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import GameBoard from './GameBoard';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        width: 'auto',
        height: 'auto',
        padding: theme.spacing(2),
        textAlign: 'center',
        background: '#85C225',
        color: '#282C34',
    },
}));

export default function MainContainer() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <GameBoard />
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}
