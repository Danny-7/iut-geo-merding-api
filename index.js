const express = require('express');
const cors = require('cors');
const geoRoutes = require('./routes');

const app = express();

const PORT = 8500;

app.use(express.json());
app.use(cors());

app.use('/geo-merding/api', geoRoutes);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));