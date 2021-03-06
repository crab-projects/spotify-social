import express = require('express');
const path = require('path');
//const cors = require('cors');
const app: express.Application = express();
//const app = express();
//app.use(express.json());
//app.use(cors());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

const port = process.env.PORT || 5000 || '0.0.0.0';
app.listen(port);

console.log(`spotify-social listening on ${port}`);
