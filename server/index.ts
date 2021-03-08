require('dotenv').config({ path: require('find-config')('.env') });

const qs = require('qs');

import express = require('express');
const cors = require('cors');
const app: express.Application = express();
app.use(cors());

const path = require('path');

const axios = require('axios');
import { AxiosError } from 'axios';
import { profile } from 'node:console';

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
    const userId = response.data.id;
    const newProfileData = {
      ...profileData,
      profileImageUrl: response.data.images[0].url,
      displayName: response.data.display_name,
      username: userId,
      numFollowers: response.data.followers.total
    }
    return Promise.all([axios({
      method: 'get',
      url: 'https://api.spotify.com/v1/users/' + userId + '/playlists',
      headers: { 
        'Authorization': 'Bearer ' + access_token,
      },
      json: true
    }), newProfileData, access_token]);
  })
  .then(([response, profileData, access_token]: [any, DefaultProfile, string]) => {

    const playlists = response.data.items;
    if (playlists.length > 1) {
      // const playlist = playlists[1];
      const newProfileData = {
        ...profileData,
        numPlaylists: playlists.length,
      };

      // const playlistResponses: Array<any> = [];
      // playlists.forEach(async (playlist: any) => {
      //   const playlistId = playlist.id;
      //   const playlistRes = 
      //     await axios({
      //       method: 'get',
      //       url: 'https://api.spotify.com/v1/playlists/' + playlistId,
      //       headers: {
      //         'Authorization': 'Bearer ' + access_token,
      //       },
      //       json: true
      //     });
      //   playlistResponses.push(playlistRes
      //   );
      // });

      return Promise.all([
        newProfileData,
        access_token,
        ...(playlists.map((playlist: any) => {
          return axios({
            method: 'get',
            url: 'https://api.spotify.com/v1/playlists/' + playlist.id,
            headers: {
              'Authorization': 'Bearer ' + access_token,
            },
            json: true
          });
        }))
      ]);

      // return Promise.all([axios({
      //   method: 'get',
      //   url: 'https://api.spotify.com/v1/playlists/' + playlistId + '/tracks',
      //   headers: {
      //     'Authorization': 'Bearer ' + access_token,
      //   },
      //   json: true
      // }), profileData, access_token]);
    } else {

      res.send({
        message: 'It worked!',
        data: response.data
      });
    }
  })
  .then((response: any) => {//([response, profileData, access_token]: [any, object, string]) => {

    const [ profileData, access_token, ...responses] = response;

    const newProfileData = {
      ...profileData,
      playlists: responses.map((r: any) => {
        const images = r.data.images;
        return {
          imageUrl: images.length > 0 ? images[0].url : '',
          name: r.data.name,
          id: r.data.id
        };
      })
    };

    responses.splice(0, 1); // skip over local files

    return Promise.all([
      newProfileData,
      ...(responses.map((r: any) => {
        const tracks = r.data.tracks.items;
        return axios({
          method: 'get',
          url: 'https://api.spotify.com/v1/tracks/' + tracks[0].track.id,
          headers: {
            'Authorization': 'Bearer ' + access_token,
          },
          json: true
        });
      })),
      // ...(responses.map((r: any) => {
      //   const tracks = r.data.tracks.items;
      //   return axios({
      //     method: 'get',
      //     url: 'https://api.spotify.com/v1/audio-features/' + tracks[0].track.id,
      //     headers: {
      //       'Authorization': 'Bearer ' + access_token,
      //     },
      //     json: true
      //   });
      // }))
    ]);

    // return Promise.all([
    //   newProfileData,
    //   ...(responses.map((r: any) => {
    //     const tracks = r.data.tracks.items;
        
    //     return axios({
    //       method: 'get',
    //       url: 'https://api.spotify.com/v1/tracks?' + qs.stringify({ids: tracks.map((track: any) => track.track.id)}),// tracks.map((track: any) => 'ids[]=' + track.track.id).join('&'),
    //       headers: {
    //         'Authorization': 'Bearer ' + access_token,
    //       },
    //       // params: {
    //       //   ids: tracks.map((track: any) => {
    //       //     return track.track.id;
    //       //   })
    //       // },
    //       // paramsSerializer: (params: any) => {
    //       //   return qs.stringify(params);
    //       // },
    //       json: true
    //     });
    //   }))
    // ]);

    //res.send(newProfileData);
    
    // const tracks = responses[1].data.tracks.items;
    // let returned = false;
    // if (tracks) {
    //   const track = tracks[0];
    //   console.log('TRACK ID: ');
    //   console.log(track);
    //   const trackId = track.track.id;
    //   if (trackId) {
    //     returned = true;

    //     return axios.all([
    //       axios({
    //         method: 'get',
    //         url: 'https://api.spotify.com/v1/tracks/' + trackId,
    //         headers: {
    //           'Authorization': 'Bearer ' + access_token,
    //         },
    //         json: true
    //       }),
    //       axios({
    //         method: 'get',
    //         url: 'https://api.spotify.com/v1/audio-features/' + trackId,
    //         headers: {
    //           'Authorization': 'Bearer ' + access_token,
    //         },
    //         json: true
    //       }),
    //       newProfileData
    //     ]);

    //   }
    // }

    // if (!returned) {
    //   res.send({
    //     message: 'Stopped.',
    //     data: response.data
    //   });
    // }

  })
  .then((response: any) => {//axios.spread((responses: any) => {

    const [profileData, ...responses] = response;

    const newProfileData = {
      ...profileData,
      graphData: {
        danceability: 2,
        energy: 4,
        speechiness: 3,
        acousticness: 4,
        instrumentalness: 4,
        liveness: 4,
        valence: 7 
      },
      artists: responses.map((r: any) => {
        return r.data.artists[0].name;
      })
    };

    //console.log(track_res);
    console.log("-----");
    //console.log(audio_feat_res);
    console.log(profileData);
    res.send(newProfileData);
  })//)
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
