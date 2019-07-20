import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
    msg: {
        textAlign: 'center',
        margin: '4px',
        width: 'auto',
        height: 'auto',
        padding: '10px',
        border: '4px solid #1CA8FC',
        background: '#282C34',
        color: '#85C225',

        [theme.breakpoints.down('sm')]: {
            width: '70vw',
            position: 'relative',
            right: '30vw',
        },
        [theme.breakpoints.between('sm', 'md')]: {
            width: '70vw',
            position: 'relative',
            right: '25vw',
        },
    },

}));

export default function MsgScreen(props) {
    const classes = useStyles();
    const {msg} = props;
    return (
        <Grid container justify="center" spacing={3}>
            <Grid item xs={5}>
                <Paper className={classes.msg}>
                    {msg}
                </Paper>
            </Grid>
        </Grid>
    );
}
