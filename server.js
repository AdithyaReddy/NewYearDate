const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const app            = express();
const db             = require('./config/db');
var PythonShell      = require('python-shell');

//var DBurl = 'mongodb://adithya:reddy@ds131137.mlab.com:31137/behenchoda';
const port = 8000;
app.use(bodyParser.json({}));

app.use(express.static('public'));
app.set('view engine', 'ejs');

MongoClient.connect(db.url, (err, database) => {
  if (err) return console.log(err)
  //const behenchodaDb = database.db('behenchoda')
  //behenchodaDb.collection('users')
  require('./app/routes')(app, database, PythonShell);
  app.listen(port, () => {
    console.log('We are live on ' + port);
  });             
});



