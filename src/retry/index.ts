import axios from 'axios';
import http from 'http';
import https from 'https';
import axiosRetry from 'axios-retry';

axiosRetry(axios, { retries: 3 });

(async () => {
  const httpAgent = new http.Agent({
    keepAlive: true,
  });
  const httpsAgent = new https.Agent({
    keepAlive: true,
  });

  const promises = [];
  for (let i = 1; i <= 2; i++) {
    promises.push(
      new Promise((resolve, reject) => {
        axios
          .get(`http://localhost:8001/${i}`, {
            httpAgent,
            httpsAgent,
          })
          .then(() => {
            console.log(`success ${i}`);
            resolve('success');
          })
          .catch((err) => {
            console.log(`error ${i} ${err}`);
            console.log(`response: ${err.response}`);
            console.log(`code: ${err.code}`);
            reject('error');
          });
      }),
    );
  }

  await Promise.all(promises);
})();
