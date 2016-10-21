let express = require('express');

let fluent = require('fluent-logger');
//configure the logger, dummy values for now, will change to real values afterwards

fluent.configure('myservice', {
  host: 'logger',
  port: 24224,
  timeout: 3.0,
  reconnectInterval: 600000 //10 minutes
});

// Load express
let app = express();


app.get('/', function (req, res) {
  res.send('Hello World!');
  fluent.emit('hello', {record: 'hello world was sent'});
  console.log("trying to emit hello world message");

});

app.listen(3000, function () {
  console.log('Example app listening on port 3000 ftw!');
  fluent.emit('startup', {record: 'auth service started propery'});

});
