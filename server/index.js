const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const initRoutes = require('./routes');
const { initStore } = require('./store');
const { initRelationStore } = require('./relation_store');

const PORT = 5005;
const successStartHander = () => console.info(`Server is running: http://localhost:${PORT}/`);
const app = express();

// Configure the app
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

initRoutes(app);
Promise.all([ initStore(), initRelationStore() ])
    .then(() => app.listen(PORT, successStartHander));
