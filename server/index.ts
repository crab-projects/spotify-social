import express = require('express');
import { appendFileSync } from 'node:fs';
const path = require('path');
//const cors = require('cors');
const app: express.Application = express();
//const app = express();
//app.use(express.json());
//app.use(cors());
const axios = require('axios');
import { AxiosResponse, AxiosError } from 'axios';

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

var client_id = 'bfddae141be44fdb893ee75e3dfd1ed2'; // Your client id
var client_secret = '5ceb681182ae43cf8ebdd99defcb755b'; // Your secret


app.get('/api/spotifytest', (req, res) => {

  axios({
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      params: {
        grant_type: 'client_credentials'
      },
      headers: { 
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')),
        'Content-Type': 'application/x-www-form-urlencoded' 
      },
      json: true
    })
    .then((response: any) => {
      console.log(response);
      return Promise.all([axios({
        method: 'get',
        url: 'https://api.spotify.com/v1/users/shidoarichimorin',
        headers: { 
          'Authorization': 'Bearer ' + response.data.access_token,
        },
        json: true
      }), response.data.access_token]);
    })
    .then(([response, access_token]: [any, any]) => {
      console.log(response);
      const user_id = response.data.id;
      return axios({
        method: 'get',
        url: 'https://api.spotify.com/v1/users/' + user_id + '/playlists',
        headers: { 
          'Authorization': 'Bearer ' + access_token,
        },
        json: true
      });
    })
    .then((response: any) => {
      res.send({
        message: 'It worked!',
        data: response.data
      });
    })
    .catch((error: AxiosError) => {
      console.log(error);
    });
});


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

const port = process.env.PORT || 5000 || '0.0.0.0';
app.listen(port);



console.log(`spotify-social listening on ${port}`);
