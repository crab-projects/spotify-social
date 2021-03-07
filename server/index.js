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
    var express = require("express");
    var path = require('path');
    //const cors = require('cors');
    var app = express();
    //const app = express();
    //app.use(express.json());
    //app.use(cors());
    var axios = require('axios');
    // Serve static files from the React app
    app.use(express.static(path.join(__dirname, '../client/build')));
    var client_id = 'bfddae141be44fdb893ee75e3dfd1ed2'; // Your client id
    var client_secret = '5ceb681182ae43cf8ebdd99defcb755b'; // Your secret
    app.get('/api/spotifytest', function (req, res) {
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
            return axios({
                method: 'get',
                url: 'https://api.spotify.com/v1/users/shidoarichimorin',
                headers: {
                    'Authorization': 'Bearer ' + response.data.access_token,
                },
                json: true
            });
        }).then(function (response) {
            console.log(response);
            res.send({
                message: 'It worked!',
                data: response.data
            });
        })
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