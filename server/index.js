const express = require("express");
const config = require('./config');
const app = express();

const cacheVideo = {
  data: null,
  timestamp: null
};

// Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.get('/', (req, res) => {
  res.send('Server running');
});

app.get('/allvideos', (req, res) => {
  const currentTimestamp = (new Date()).getTime();
  if (!cacheVideo.data || cacheVideo.timestamp + config.cacheTime < currentTimestamp) {

    try {
      cacheVideo.data = require('./data/videosLog.json');
      cacheVideo.timestamp = (new Date()).getTime();
      res.send(cacheVideo.data);
    } catch (e) {
      console.log(e)
      res.status(503).send({
        error: 'Service Unavailable'
      });
    }
  } else {
    res.send(cacheVideo.data);
  }
});

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}: http://localhost:${config.port}`);
});
