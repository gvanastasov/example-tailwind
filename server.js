const express = require('express');
const path = require('path');

const server = express();
const port = process.env.PORT || 8080;
const publicLocation = express.static(path.join(__dirname,'./public'));

server.get('/', function(_req, res) {
    res.sendFile(path.join(__dirname, './index.html'));
});

server.use(publicLocation);

server.listen(port, () => {
    console.log('Server started at http://localhost:' + port);
});
