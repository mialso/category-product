const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const initRoutes = require('./routes');
const { initStore } = require('./store');

const PORT = 5005;
const app = express();

// Configure the app
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

initRoutes(app);
initStore();

app.listen(PORT, () => console.info(`Server is running: http://localhost:${PORT}/`));
