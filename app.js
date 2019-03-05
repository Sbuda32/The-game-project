var express = require('express');

const session = require('express-session');
const bodyParser = require('body-parser');

const route = require('./routes/');//game route

const auth = require('./routes/auth');//authentication route

const db = require('./models');