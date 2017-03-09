const express = require('express');
const app = new express();
const db = require('./models');
const chalk = require('chalk');
const volleyball = require('volleyball');
const bodyParser = require('body-parser');
const path = require('path');
const nunjucks = require('nunjucks');

app.use(volleyball);
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join('public')));

app.set('view engine','html');
app.engine('html', nunjucks.render);
nunjucks.configure('views',{noCache: true });

app.get('/', (req, res, next)=>{
	res.render('index');
});

// catch 404 (i.e., no route was hit) and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// handle all errors (anything passed into `next()`)
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  console.error(err);
  res.render('error', {error: err, status: err.status}  );
});


const port = process.env.PORT || 3000;

db.sync()
.then(()=> {
	app.listen(port,()=> console.log(chalk.blue(`listening on port ${port}`)));
});

 