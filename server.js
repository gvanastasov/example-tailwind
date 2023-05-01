const express = require('express');
const path = require('path');
const livereload = require("livereload");
const connectLivereload = require("connect-livereload");

const server = express();
const hostname = 'localhost'
const port = process.env.PORT || 8080;
const publicLocation = express.static(path.join(__dirname,'./public'));

if (process.env.NODE_ENV === 'development') {
    console.log('Setting up live reload server...')

    const liveReloadServer = livereload.createServer();
    liveReloadServer.watch(path.join(__dirname, 'index.html'));
    liveReloadServer.watch(path.join(__dirname, 'public/index.css'));
    liveReloadServer.server.once("connection", () => {
        setTimeout(() => {
        liveReloadServer.refresh("/");
        }, 100);
    });

    server.use(connectLivereload());
}

server.get('/', function(_req, res) {
    res.render(path.join(__dirname, './src/index.ejs'));
});

server.use(publicLocation);

server.listen(port, () => {
    console.log('Service started successfully...')
    const url = `http://${hostname}:${port}`
  
    try {
      openBrowser(url)
      console.log(`Browser session started at ${url}`)
    } catch {
      console.log(`Open browser session at ${url}`)
    }
});

function openBrowser(url) {
    const start = (process.platform === 'darwin'
        ? 'open'
        : process.platform === 'win32'
            ? 'start'
            : 'xdg-open')
    require('child_process').exec(start + ' ' + url)
}
