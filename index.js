const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require("./routes/route");
require('dotenv').config()

const sequelize = require('./database/database');
sequelize.authenticate().then(() => {
    console.log('Database connected...');
}).catch(err => {
    console.log('Error: ' + err);
});

const app = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors("*"));
router(app);

const SV_PORT = process.env.SV_PORT;
sequelize.sync().then(() => {
    app.listen(SV_PORT, console.log(`Server started on port ${SV_PORT}`));
}).catch(err => console.log("Error: " + err));