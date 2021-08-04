const bikeRoutes = require('./routes/bike');
const connection = require('./db');
const cors = require('cors');
const express = require('express');
const app = express();
const path = require('path');

connection();

app.use(express.json());
app.use(cors());

app.use('/api/bikes', bikeRoutes);

// app.use(express.static(path.join(__dirname, 'client', 'build')));

// app.get('/*', function (req, res) {
//   res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
// });

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));
