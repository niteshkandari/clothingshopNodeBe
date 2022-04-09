require("dotenv").config();
const app = require("./app");

const { PORT } = process.env;

/**Another way of creating a server*/
// const http = require('http');
// const server = http.createServer(app);
/***************************** */

app.listen(PORT, () => {
    console.log(`server listening on ${PORT}`)
})