const express = require('express');
// const path = require('path');
const bodyParser = require('body-parser');
// const session = require('express-session');
const cors = require('cors');

const initRoutes = require('./routes');
const { initStore } = require('./store');

const PORT = 5005;
const app = express();

// Configure the app
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, 'public')));
/*
app.use(session({
    secret: 'some-awesome-secret',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
}));
*/

initRoutes(app);
initStore();

app.listen(PORT, () => console.info(`Server running on http://localhost:${PORT}/`));
