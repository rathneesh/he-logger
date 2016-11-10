// Copyright 2016 Hewlett-Packard Development Company, L.P.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
// of the Software, and to permit persons to whom the Software is furnished to do
// so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
//
// END OF TERMS AND CONDITIONS

let express = require('express');

let fluent = require('fluent-logger');
//configure the logger, dummy values for now, will change to real values afterwards

fluent.configure('demo', {
  host: 'logger',
  port: 24224,
  timeout: 10,
  reconnectInterval: 60000 // 1 minute
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
