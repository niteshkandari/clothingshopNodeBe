require("dotenv").config();
const app = require("./app");

// const http = require('http');

const { PORT } = process.env;
// const server = http.createServer(app);

app.listen(PORT, () => {
    console.log(`server listening on ${PORT}`)
})