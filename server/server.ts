require('dotenv').config({silent: true});
import * as express from 'express'; //ef6 way of doing it(recommended)
//import expr = require('express');//node way of doing it
import * as mongoose from 'mongoose';
import * as path from 'path';
import * as bodyParser from 'body-parser';
console.log(process.env.NODE_ENV);
const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URL =  process.env.MONGO_URL || 'mongodb://localhost/node-example';

require('./api/movie/movieModel');
require('./api/auth/userModel');
mongoose.connect(MONGO_URL, (err) => {
  console.log(err || `Connected MongoDB to: ${MONGO_URL}`);
  if(err) process.exit(1);
});

app.use('/lib', express.static('bower_components'));
app.use('/client', express.static('client'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res, next) => {
  res.sendfile(path.normalize(__dirname + '/../client/index.html'));
});

app.use('/api/movies', require('./api/movie/movieRoutes'));
app.use('/api/auth', require('./api/auth/authRoutes'));

app.get(/\/(api|client|lib).+/,(req, res, next) =>{
  res.sendStatus(404);
});

app.get('/*', (req, res, next) => {
  res.sendFile(path.normalize(__dirname + '/../client/index.html'));
});

if(process.env.NODE_ENV === 'development'){
  app.use((err: any, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send(err);
  });
} else {
  app.use((err: any, req, res, next) => {
    res.status(err.status || 500).send({name: err.name, message: err.message});
  });
}

//for testing
export let server = app.listen(PORT, () => {
  console.log(`server is litening on http://localhost:${PORT}`);
});
