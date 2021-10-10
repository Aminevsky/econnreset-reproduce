import axios from 'axios';
import * as http from 'http';
import * as https from 'https';

if (process.argv.length !== 3) {
  console.log('Invalid parameter');
  console.log('usage: index.js timeoutMs');
  process.exit(1);
}

const timeoutMs = parseInt(process.argv[2], 10);

(async () => {
  const httpAgent = new http.Agent({ keepAlive: true });
  const httpsAgent = new https.Agent({ keepAlive: true });

  for (let i = 1; i <= 10; i++) {
    await new Promise(async (resolve) => {
      setTimeout(async () => {
        try {
          await axios.get(`http://localhost:8001/${i}`, {
            httpAgent,
            httpsAgent,
          });
          console.log(`Success: ${i}`);
          resolve('Success');
        } catch (err) {
          console.error(`Error: ${i}, ${err}`);
          resolve('Error');
        }
      }, timeoutMs);
    });
  }
})();
