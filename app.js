const express = require('express');
const methodOverride = require('method-override');
const apiController = require('./controllers/apiController');
const viewController = require('./controllers/viewController');
const app = express();

app.use(express.static('public', { maxAge: 1000 }));
app.use(express.urlencoded());
app.use(methodOverride('_method'));
app.use(apiController);
app.use(viewController);

module.exports = app;
