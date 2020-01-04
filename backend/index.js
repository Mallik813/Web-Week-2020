const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');

const app = express();

app.use(expressLayouts);
app.set('view engine', 'ejs');

app.use(express.static('./public'));
// Express body parser
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'seCReT',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));

app.use('/', require('./routes/index.js'));

app.use('/users', require('./routes/users.js'));

app.get('*', (req, res) => {
  res.status(404).send('You did something wrong!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));