require('dotenv').config({ path: require('find-config')('.env') });

import express = require('express');
//const cors = require('cors');
const app: express.Application = express();

const path = require('path');

const axios = require('axios');
import { AxiosError } from 'axios';

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

// Client-credential authorization
var client_id = process.env.SPOTIFY_DEV_ID; // Your client id
var client_secret = process.env.SPOTIFY_DEV_SECRET; // Your secret


// Default profile type definitions
interface DefaultProfile {
  profileImageUrl: string,
  displayName: string,
  username: string,
  numPlaylists: number,
  numFollowers: number,
  numFollowing: number,
  graphData: DefaultProfileGraph,
  artists: Array<DefaultProfileArtist>,
  playlists: Array<DefaultProfilePlaylist>
}

interface DefaultProfileGraph {
  danceability: number,
  energy: number,
  speechiness: number,
  acousticness: number,
  instrumentalness: number,
  liveness: number,
  valence: number
}

interface DefaultProfileArtist {
  imageUrl: string,
  name: string,
  id: string
}

interface DefaultProfilePlaylist {
  imageUrl: string,
  name: string,
  id: string,
}

app.get('/api/defaultProfile', (req, res) => {

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
    const profileData = {
      profileImageUrl: '',
      displayName: '',
      username: '',
      numPlaylists: 0,
      numFollowers: 0,
      numFollowing: 0,
      graphData: {},
      artists: [],
      playlists: [] 
    }
    return Promise.all([axios({
      method: 'get',
      url: 'https://api.spotify.com/v1/users/shidoarichimorin',
      headers: { 
        'Authorization': 'Bearer ' + response.data.access_token,
      },
      json: true
    }), profileData, response.data.access_token]);
  })
  .then(([response, profileData, access_token]: [any, DefaultProfile, string]) => {

    console.log(response);
    const user_id = response.data.id;
    return Promise.all([axios({
      method: 'get',
      url: 'https://api.spotify.com/v1/users/' + user_id + '/playlists',
      headers: { 
        'Authorization': 'Bearer ' + access_token,
      },
      json: true
    }), profileData, access_token]);
  })
  .then(([response, profileData, access_token]: [any, DefaultProfile, string]) => {

    const playlists = response.data.items;
    if (playlists.length > 1) {
      const playlist_id = playlists[1].id;
      return Promise.all([axios({
        method: 'get',
        url: 'https://api.spotify.com/v1/playlists/' + playlist_id + '/tracks',
        headers: {
          'Authorization': 'Bearer ' + access_token,
        },
        json: true
      }), profileData, access_token]);
    } else {

      res.send({
        message: 'It worked!',
        data: response.data
      });
    }
  })
  .then(([response, profileData, access_token]: [any, object, string]) => {
    
    const tracks = response.data.items;
    let returned = false;
    if (tracks) {
      const track = tracks[0];
      console.log('TRACK ID: ');
      console.log(track);
      const track_id = track.track.id;
      if (track_id) {
        returned = true;

        return axios.all([
          axios({
            method: 'get',
            url: 'https://api.spotify.com/v1/tracks/' + track_id,
            headers: {
              'Authorization': 'Bearer ' + access_token,
            },
            json: true
          }),
          axios({
            method: 'get',
            url: 'https://api.spotify.com/v1/audio-features/' + track_id,
            headers: {
              'Authorization': 'Bearer ' + access_token,
            },
            json: true
          }),
          profileData
        ]);

      }
    }

    if (!returned) {
      res.send({
        message: 'It worked!',
        data: response.data
      });
    }

  })
  .then(axios.spread((track_res: any, audio_feat_res: any, profileData: object) => {

    console.log(track_res);
    console.log("-----");
    console.log(audio_feat_res);
    console.log(profileData);
    res.send(profileData);
  }))
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
