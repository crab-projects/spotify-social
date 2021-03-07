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
    var express = require("express");
    //const cors = require('cors');
    var app = express();
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
            var user_id = response.data.id;
            return Promise.all([axios({
                    method: 'get',
                    url: 'https://api.spotify.com/v1/users/' + user_id + '/playlists',
                    headers: {
                        'Authorization': 'Bearer ' + access_token,
                    },
                    json: true
                }), profileData, access_token]);
        })
            .then(function (_a) {
            var response = _a[0], profileData = _a[1], access_token = _a[2];
            var playlists = response.data.items;
            if (playlists.length > 1) {
                var playlist_id = playlists[1].id;
                return Promise.all([axios({
                        method: 'get',
                        url: 'https://api.spotify.com/v1/playlists/' + playlist_id + '/tracks',
                        headers: {
                            'Authorization': 'Bearer ' + access_token,
                        },
                        json: true
                    }), profileData, access_token]);
            }
            else {
                res.send({
                    message: 'It worked!',
                    data: response.data
                });
            }
        })
            .then(function (_a) {
            var response = _a[0], profileData = _a[1], access_token = _a[2];
            var tracks = response.data.items;
            var returned = false;
            if (tracks) {
                var track = tracks[0];
                console.log('TRACK ID: ');
                console.log(track);
                var track_id = track.track.id;
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
            .then(axios.spread(function (track_res, audio_feat_res, profileData) {
            console.log(track_res);
            console.log("-----");
            console.log(audio_feat_res);
            console.log(profileData);
            res.send({
                message: 'It worked!',
                track_data: track_res.data,
                audio_feat_data: audio_feat_res.data
            });
        }))
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