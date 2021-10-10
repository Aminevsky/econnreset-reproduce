import * as http from 'http';

const BASE_URL = 'http://localhost';
const PORT_NO = 8001;

http
  .createServer((_, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Success' }));
  })
  .listen(PORT_NO);

console.log(`Server running at ${BASE_URL}:${PORT_NO}`);
