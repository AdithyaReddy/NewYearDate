const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const app            = express();
const db             = require('./config/db');
//var DBurl = 'mongodb://adithya:reddy@ds131137.mlab.com:31137/behenchoda';
const port = 8000;
app.use(bodyParser.json({}));

MongoClient.connect(db.url, (err, database) => {
  if (err) return console.log(err)
  //const behenchodaDb = database.db('behenchoda')
  //behenchodaDb.collection('users')
  require('./app/routes')(app, database);
  app.listen(port, () => {
    console.log('We are live on ' + port);
  });             
});


