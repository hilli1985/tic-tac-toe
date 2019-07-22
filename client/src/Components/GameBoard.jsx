import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ButtonGroup from '@material-ui/core/ButtonGroup';
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
    smallBtn: {
        padding: theme.spacing(1),
        background: '#282C34',
        color: '#FFFFFF',
        textTransform: 'capitalize',
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
const resetedBoard = {
    0: ['none', 'none', 'none'],
    1: ['none', 'none', 'none'],
    2: ['none', 'none', 'none'],
};

class GameBoard extends React.Component {
    state = {
        currentGameState: gameStates.RESET,
        playerIcon: {
            player1: 'x',
            player2: 'o',
        },
        currentPlayer: players.PLAYER1,
        board: resetedBoard,
    };

    setPlayerIcon = sign => {
        if (sign === gameIcons.x)
            this.setState({
                playerIcon: {
                    player1: 'x',
                    player2: 'o',
                },
            });
        else if (sign === gameIcons.o)
            this.setState({
                playerIcon: {
                    player1: 'o',
                    player2: 'x',
                },
            });
    };

    checkGameStatus = (row, col) => {
        const {currentPlayer, playerIcon, board} = this.state;
        const currentSign = playerIcon[currentPlayer];
        if (board[row].filter(item => item === currentSign).length === 3) {
            this.setWinner();
        } else if (
            board[0][col] === currentSign &&
            board[1][col] === currentSign &&
            board[2][col] === currentSign
        ) {
            this.setWinner();
        } else if (
            board[0][0] === currentSign &&
            board[1][1] === currentSign &&
            board[2][2] === currentSign
        ) {
            this.setWinner();
        } else if (
            board[0][2] === currentSign &&
            board[1][1] === currentSign &&
            board[2][0] === currentSign
        ) {
            this.setWinner();
        } else if (
            board[0].filter(item => item !== gameIcons.none).length === 3 &&
            board[1].filter(item => item !== gameIcons.none).length === 3 &&
            board[2].filter(item => item !== gameIcons.none).length === 3
        ) {
            const newCurrentGameState = gameStates.TIE;
            this.setState({currentGameState: newCurrentGameState});
        } else {
            this.togglePlayer();
        }
    };

    setWinner = () => {
        const {currentPlayer} = this.state;
        const newCurrentGameState =
            currentPlayer === players.PLAYER1
                ? gameStates.PLAYER1WON
                : gameStates.PLAYER2WON;
        this.setState({currentGameState: newCurrentGameState});
    };

    startNewGame = () => {
        this.setState({
            currentGameState: gameStates.RESET,
            board: resetedBoard,
            currentPlayer: players.PLAYER1,
        });
    };

    play = (row, col) => {
        const {currentPlayer, playerIcon, currentGameState} = this.state;
        let {board} = this.state;
        if (
            (currentGameState !== gameStates.RESET &&
                currentGameState !== gameStates.INPLAY) ||
            board[row][col] !== gameIcons.none
        ) {
            return;
        }
        board = {
            ...board,
            [row]: board[row].map((item, index) =>
                index === col ? playerIcon[currentPlayer] : item,
            ),
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

    renderBoard = () => {
        const {board} = this.state;
        return Object.keys(board).map(row => (
            <Grid key={row} container direction="row" justify="center">
                {board[row].map((item, col) => (
                    <Grid key={col} item>
                        <Cell onClick={() => this.play(row, col)} sign={item} />
                    </Grid>
                ))}
            </Grid>
        ));
    };

    render() {
        const {classes} = this.props;
        const {currentGameState, currentPlayer} = this.state;
        const msg =
            currentGameState === gameStates.INPLAY ||
            currentGameState === gameStates.RESET
                ? ' Current: ' + currentPlayer
                : currentGameState;
        const msg2 =
            currentGameState === gameStates.RESET
                ? 'Please click the sign to choose which is yours.'
                : 'Please click reset to start a new game.';
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
                    <ButtonGroup
                        variant="contained"
                        size="small"
                        aria-label="Small outlined button group"
                    >
                        <Button
                            className={classes.smallBtn}
                            onClick={() => this.setPlayerIcon(gameIcons.x)}
                        >
                            X
                        </Button>
                        <Button
                            className={classes.smallBtn}
                            onClick={() => this.setPlayerIcon(gameIcons.o)}
                        >
                            O
                        </Button>
                    </ButtonGroup>
                    <Typography className={classes.msg}>{msg2}</Typography>
                    {this.renderBoard()}
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(style)(GameBoard);
