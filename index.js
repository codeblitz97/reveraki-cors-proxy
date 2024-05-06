const cors_proxy = require('cors-anywhere');

cors_proxy
  .createServer({
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
    },
  })
  .listen(8999, '0.0.0.0', () => {
    console.log('server started');
  });
