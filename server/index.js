var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "express"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    require('dotenv').config({ path: require('find-config')('.env') });
    var qs = require('qs');
    var express = require("express");
    var cors = require('cors');
    var app = express();
    app.use(cors());
    var path = require('path');
    var axios = require('axios');
    // Serve static files from the React app
    app.use(express.static(path.join(__dirname, '../client/build')));
    // Client-credential authorization
    var client_id = process.env.SPOTIFY_DEV_ID; // Your client id
    var client_secret = process.env.SPOTIFY_DEV_SECRET; // Your secret
    app.get('/api/defaultProfile', function (req, res) {
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
            .then(function (response) {
            console.log(response);
            var profileData = {
                profileImageUrl: '',
                displayName: '',
                username: '',
                numPlaylists: 0,
                numFollowers: 0,
                numFollowing: 0,
                graphData: {},
                artists: [],
                playlists: []
            };
            return Promise.all([axios({
                    method: 'get',
                    url: 'https://api.spotify.com/v1/users/shidoarichimorin',
                    headers: {
                        'Authorization': 'Bearer ' + response.data.access_token,
                    },
                    json: true
                }), profileData, response.data.access_token]);
        })
            .then(function (_a) {
            var response = _a[0], profileData = _a[1], access_token = _a[2];
            console.log(response);
            var userId = response.data.id;
            var newProfileData = __assign(__assign({}, profileData), { profileImageUrl: response.data.images[0].url, displayName: response.data.display_name, username: userId, numFollowers: response.data.followers.total });
            return Promise.all([axios({
                    method: 'get',
                    url: 'https://api.spotify.com/v1/users/' + userId + '/playlists',
                    headers: {
                        'Authorization': 'Bearer ' + access_token,
                    },
                    json: true
                }), newProfileData, access_token]);
        })
            .then(function (_a) {
            var response = _a[0], profileData = _a[1], access_token = _a[2];
            var playlists = response.data.items;
            if (playlists.length > 1) {
                // const playlist = playlists[1];
                var newProfileData = __assign(__assign({}, profileData), { numPlaylists: playlists.length });
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
                return Promise.all(__spreadArray([
                    newProfileData,
                    access_token
                ], (playlists.map(function (playlist) {
                    return axios({
                        method: 'get',
                        url: 'https://api.spotify.com/v1/playlists/' + playlist.id,
                        headers: {
                            'Authorization': 'Bearer ' + access_token,
                        },
                        json: true
                    });
                }))));
                // return Promise.all([axios({
                //   method: 'get',
                //   url: 'https://api.spotify.com/v1/playlists/' + playlistId + '/tracks',
                //   headers: {
                //     'Authorization': 'Bearer ' + access_token,
                //   },
                //   json: true
                // }), profileData, access_token]);
            }
            else {
                res.send({
                    message: 'It worked!',
                    data: response.data
                });
            }
        })
            .then(function (response) {
            var profileData = response[0], access_token = response[1], responses = response.slice(2);
            var newProfileData = __assign(__assign({}, profileData), { playlists: responses.map(function (r) {
                    var images = r.data.images;
                    return {
                        imageUrl: images.length > 0 ? images[0].url : '',
                        name: r.data.name,
                        id: r.data.id
                    };
                }) });
            responses.splice(0, 1); // skip over local files
            return Promise.all(__spreadArray([
                newProfileData
            ], (responses.map(function (r) {
                var tracks = r.data.tracks.items;
                return axios({
                    method: 'get',
                    url: 'https://api.spotify.com/v1/tracks/' + tracks[0].track.id,
                    headers: {
                        'Authorization': 'Bearer ' + access_token,
                    },
                    json: true
                });
            }))));
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
            .then(function (response) {
            var profileData = response[0], responses = response.slice(1);
            var newProfileData = __assign(__assign({}, profileData), { graphData: {
                    danceability: 2,
                    energy: 4,
                    speechiness: 3,
                    acousticness: 4,
                    instrumentalness: 4,
                    liveness: 4,
                    valence: 7
                }, artists: responses.map(function (r) {
                    return r.data.artists[0].name;
                }) });
            //console.log(track_res);
            console.log("-----");
            //console.log(audio_feat_res);
            console.log(profileData);
            res.send(newProfileData);
        }) //)
            .catch(function (error) {
            console.log(error);
        });
    });
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, '../client/build/index.html'));
    });
    var port = process.env.PORT || 5000 || '0.0.0.0';
    app.listen(port);
    console.log("spotify-social listening on " + port);
});
//# sourceMappingURL=index.js.map