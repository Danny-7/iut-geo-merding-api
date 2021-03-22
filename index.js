const express = require('express');
const cors = require('cors');
const env = require('dotenv').config();

const geoRoutes = require('./routes');

const app = express();

const PORT = process.env.PORT || 5400;

app.use(express.json());
app.use(cors());

app.use('/geo-merding/api', geoRoutes);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));