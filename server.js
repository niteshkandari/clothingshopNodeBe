const app = require('express')();
const http = require('http');

const server = http.createServer(app);

server.listen(3030, () => {
    console.log(`port listening on ${3030}`)
})