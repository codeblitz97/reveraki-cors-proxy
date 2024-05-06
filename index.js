const express = require('express');
const cors_proxy = require('cors-anywhere');
const cors = require('cors');

const app = express();

const corsOptions = {
  originBlacklist: [],
  originWhitelist: [], // Allow all origins
  requireHeader: [],
  removeHeaders: [
    'cookie',
    'cookie2',
    // Strip Heroku-specific headers
    'x-request-start',
    'x-request-id',
    'via',
    'connect-time',
    'total-route-time',
    // Other Heroku added debug headers
    // 'x-forwarded-for',
    // 'x-forwarded-proto',
    // 'x-forwarded-port',
  ],
  setHeaders: {
    Referer: 'https://megacloud.tv/',
    Origin: 'https://megacloud.tv',
  },
};

// Create the CORS proxy server
const server = cors_proxy.createServer(corsOptions);

app.use('/', (req, res) => {
  server.emit('request', req, res);
});

app.use(cors());

const PORT = process.env.PORT || 8999;
const HOST = process.env.HOST || '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`Server started on ${HOST}:${PORT}`);
});
