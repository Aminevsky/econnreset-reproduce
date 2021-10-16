# econnreset-reproduce

Sometimes I come across `read ECONNRESET` error in Node.js.

In this project, I try to reproduce the error.

And, from my point of view, retrying is a good solution.

## Build

```shell
$ yarn
$ yarn build
```

## Reproduction

### 1. Keep-Alive timeout

If no requests are sent beyond Keep-Alive timeout, the server resets the connection.

After that, if the client tries to send the request, it may receive the `ECONNRESET` error. 

```shell
# Run a local server
$ node dist/timeout/server.js

# Run a client
$ node dist/timeout/index.js 5000
```

The client's argument is the interval milliseconds that the client sends the request.

In Node.js, 5000ms is the default value of [server.keepAliveTimeout](https://nodejs.org/docs/latest-v14.x/api/http.html#http_server_keepalivetimeout).

Thus, the `ECONNRESET` error occurs more frequently when the argument is set to `5000`.

According to my experiments, almost 40% of requests fail.

This is based on the idea of joshwilsdon's [comment](https://github.com/nodejs/node/issues/20256#issuecomment-473170418).

### 2. Max connections

If the connection count is over the max connections, the server rejects the connection and the client receives the `ECONNRESET` error.

```shell
# Run a local server
$ node dist/maxConnection/server.js 1

# Run a client
$ node dist/maxConnection/index.js
```

The server's argument is the max connections ([server.maxConnections](https://nodejs.org/docs/latest-v14.x/api/net.html#net_server_maxconnections)).

Although the client tries to send two requests in parallel, one request is accepted and another is rejected by the server.

According to my experiments, this is the easiest reproduction of `ECONNRESET` error.

## Solution

If the client receives the `ECONNRESET` error, it retries the request.

```shell
# Run a local server
$ node dist/retry/server.js 1

# Run a client
$ node dist/retry/index.js
```
