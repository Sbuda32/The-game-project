var express = require('express');

const session = require('express-session');
const bodyParser = require('body-parser');

const route = require('./routes/');//game route

const auth = require('./routes/auth');//authentication route

var app = express();
var serv = require('http').Server(app);

// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
		secret:'work hard',
		resave:true,
		saveUninitialized: true,
		cookie: { maxAge: 60000 }
}));

const db = require('./models');

var flash = require('connect-flash');

app.set('view engine','pug');

app.use(express.static(__dirname +'/assets'));

app.use('/',route);

app.use('/auth',auth);

var serv= app.listen(process.env.PORT || 4444);
 console.log("Server started.");