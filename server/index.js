const express = require('express');
const path = require('path');
//const cors = require('cors');

const app = express();
//app.use(express.json());
//app.use(cors());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));


const port = process.env.PORT || 5000 || '0.0.0.0';
app.listen(port);

console.log(`spotify-social listening on ${port}`);