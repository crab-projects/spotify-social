(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "express", "request"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var express = require("express");
    var path = require('path');
    //const cors = require('cors');
    var app = express();
    //const app = express();
    //app.use(express.json());
    //app.use(cors());
    var request = require("request"); // "Request" library
    // Serve static files from the React app
    app.use(express.static(path.join(__dirname, '../client/build')));
    var client_id = process.env.SPOTIFY_DEV_ID; // Your client id
    var client_secret = process.env.SPOTIFY_DEV_SECRET; // Your secret
    app.get('/api/spotifytest', function (req, res) {
        // your application requests authorization
        var authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            headers: {
                'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
            },
            form: {
                grant_type: 'client_credentials'
            },
            json: true
        };
        request.post(authOptions, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                // use the access token to access the Spotify Web API
                var token = body.access_token;
                var options = {
                    url: 'https://api.spotify.com/v1/users/shidoarichimorin',
                    headers: {
                        'Authorization': 'Bearer ' + token
                    },
                    json: true
                };
                request.get(options, function (error, response, body) {
                    console.log(body);
                    res.send({
                        message: 'It worked!',
                        data: body
                    });
                });
            }
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