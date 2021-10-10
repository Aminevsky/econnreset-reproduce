import * as http from 'http';

const BASE_URL = 'http://localhost';
const PORT_NO = 8001;

if (process.argv.length !== 3) {
  console.log('Invalid parameter');
  console.log('usage: server.js maxConnections');
  process.exit(1);
}

const maxConnections = parseInt(process.argv[2], 10);

const server = http.createServer((_, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Success' }));
});
server.maxConnections = maxConnections;
server.listen(PORT_NO);

console.log(`Server running at ${BASE_URL}:${PORT_NO}`);
