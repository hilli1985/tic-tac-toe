import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Cell from './Cell';
import MsgScreen from './MsgScreen';

const style = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: '#282C34',
    },
    margin: {
        margin: theme.spacing(1),
        background: '#1CA8FC',
        textTransform: 'capitalize',
        fontWeight: 'bold',
    },
    msg: {
        fontWeight: 'bold',
    },
});

const gameStates = {
    RESET: 'Reset',
    INPLAY: 'Inplay',
    TIE: 'Tie',
    PLAYER1WON: 'Congratulations!!! Player 1 Won',
    PLAYER2WON: 'Congratulations!!! Player 2 Won',
};

const gameIcons = {
    none: 'none',
    x: 'X',
    o: 'O',
};

const players = {
    PLAYER1: 'player1',
    PLAYER2: 'player2',
};

class GameBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentGameState: gameStates.RESET,
            playerIcon: {
                player1: 'x',
                player2: 'o',
            },
            currentPlayer: players.PLAYER1,
            board: {
                0: ['none', 'none', 'none'],
                1: ['none', 'none', 'none'],
                2: ['none', 'none', 'none'],
            },
        };
    }

    checkGameStatus = (row, col) => {
        const {currentPlayer, playerIcon, board} = this.state;
        const currentSign = playerIcon[currentPlayer];
        if (board[row].filter(item => item === currentSign).length === 3) {
            const newCurrentGameState = currentPlayer === players.PLAYER1
                ? gameStates.PLAYER1WON
                : gameStates.PLAYER2WON;
            this.setState({currentGameState: newCurrentGameState});
        } else if (
            board[0][col] === currentSign
            && board[1][col] === currentSign
            && board[2][col] === currentSign
        ) {
            const newCurrentGameState = currentPlayer === players.PLAYER1
                ? gameStates.PLAYER1WON
                : gameStates.PLAYER2WON;
            this.setState({currentGameState: newCurrentGameState});
        } else if (
            board[0][0] === currentSign
            && board[1][1] === currentSign
            && board[2][2] === currentSign
        ) {
            const newCurrentGameState = currentPlayer === players.PLAYER1
                ? gameStates.PLAYER1WON
                : gameStates.PLAYER2WON;
            this.setState({currentGameState: newCurrentGameState});
        } else if (
            board[0][2] === currentSign
            && board[1][1] === currentSign
            && board[2][0] === currentSign
        ) {
            const newCurrentGameState = currentPlayer === players.PLAYER1
                ? gameStates.PLAYER1WON
                : gameStates.PLAYER2WON;
            this.setState({currentGameState: newCurrentGameState});
        } else if (
            board[0].filter(item => item !== gameIcons.none).length === 3
            && board[1].filter(item => item !== gameIcons.none).length === 3
            && board[2].filter(item => item !== gameIcons.none).length === 3
        ) {
            const newCurrentGameState = gameStates.TIE;
            this.setState({currentGameState: newCurrentGameState});
        } else {
            this.togglePlayer();
        }
    };

    startNewGame = () => {
        this.setState({
            currentGameState: gameStates.RESET,
            board: {
                0: ['none', 'none', 'none'],
                1: ['none', 'none', 'none'],
                2: ['none', 'none', 'none'],
            },
            currentPlayer: players.PLAYER1,
        });
    };

    play = (row, col) => {
        const {currentPlayer, playerIcon, currentGameState} = this.state;
        let {board} = this.state;
        if (
            !(
                currentGameState === gameStates.RESET
                || currentGameState === gameStates.INPLAY
            )
        ) {
            return;
        }
        const newRow = board[row];
        board = {
            ...board,
            [row]: newRow.map((item, index) => (((index === col)
                && (item === gameIcons.none))
                ? playerIcon[currentPlayer]
                : item)),
        };
        this.setState({board, currentGameState: gameStates.INPLAY}, () => {
            this.checkGameStatus(row, col);
        });
    };

    togglePlayer = () => {
        const {currentPlayer} = this.state;
        if (currentPlayer === players.PLAYER1) {
            this.setState({currentPlayer: players.PLAYER2});
        } else {
            this.setState({currentPlayer: players.PLAYER1});
        }
    };

    boardRender = () => {
        const {board} = this.state;
        return Object.keys(board).map(row => (
            <Grid key={row} container direction="row" justify="center">
                {board[row].map((col, cId) => (
                    <Grid key={cid} item>
                        <Cell play={this.play} sign={col} row={row} col={cId} />
                    </Grid>
                ))}
            </Grid>
        ));
    };

    render() {
        const {classes} = this.props;
        const {currentGameState, currentPlayer} = this.state;
        const msg = currentGameState === gameStates.INPLAY
            || currentGameState === gameStates.RESET
            ? ' Current: ' + currentPlayer
            : currentGameState;
        return (
            <Grid container spacing={3} justify="center">
                <Grid item xs={8}>
                    <MsgScreen msg={msg} />
                    <Button
                        onClick={this.startNewGame}
                        className={classes.margin}
                        variant="contained"
                        color="default"
                        size="medium"
                    >
                        Reset
                    </Button>
                    {
                        <Typography className={classes.msg}>
                            Please click reset to start a new game.
                        </Typography>
                    }
                    {this.boardRender()}
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(style)(GameBoard);
