var express = require('express'),
    app = module.exports = express.createServer(),
    Settings = { development: {}, test: {}, production: {}};
    
// Configuration
app.configure(function () {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(require('stylus').middleware({ src: __dirname + '/public' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function () {
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function () {
  app.use(express.errorHandler());
});

// Routes
app.get('/', function (req, res) {
  res.render('index');
});

app.get('/slides', function (req, res) {
  res.render('slides');
});

var port = process.env.C9_PORT || process.env.PORT || 3000;
console.log('port is %d', port);

app.listen(port);
console.log("Express server listening at on port %d", app.address().port);