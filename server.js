const express = require('express');
const cors = require('cors');
require('dotenv').config()

const filesController = require('./controllers/files');
const apiRoute = require('./routes/api');

const app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

const filesCont = filesController({ destPath: process.env.UPLOADS_PATH });

app.use('/api', apiRoute(filesCont, {}));

const port = process.env.PORT || 3000;
const listener = app.listen(port, () => {
  console.info('Your app is listening on port ' + listener.address().port);
});
