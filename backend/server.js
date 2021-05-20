const app = require("./express-server");
const http = require("http");
const dbConfig = require("./config/database");
const DBManager = require("./managers/db-manager");
const PORT = process.env.port || 5000;
DBManager.initDBConnection(dbConfig).then(() => {
  startServer();
})
.catch((err) => {
    console.log('Error :' , err)
    process.exit(0)
})
function onListening(server) {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe" + addr : "port " + addr.port;
  console.log("Server Listening on : " + bind);
}
function startServer() {
  const server = http.createServer(app);
  server.listen(PORT);
  server.on("error", (e) => {
    console.log("Error: ", e);
    process.exit(0);
  });
  server.on("listening", () => onListening(server));
}


