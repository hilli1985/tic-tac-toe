const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const port = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname + '/client/build')));

// serve static files
app.use('/', express.static(path.join(__dirname, 'client/build')));

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization, Content-Length, X-Requested-With, live-chat-token',
    );
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept',
    );
    next();
});

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
