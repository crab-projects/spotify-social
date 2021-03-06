(function (factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    var v = factory(require, exports);
    if (v !== undefined) module.exports = v;
  } else if (typeof define === 'function' && define.amd) {
    define(['require', 'exports', 'express'], factory);
  }
})(function (require, exports) {
  'use strict';
  Object.defineProperty(exports, '__esModule', { value: true });
  var express = require('express');
  var path = require('path');
  //const cors = require('cors');
  var app = express();
  //const app = express();
  //app.use(express.json());
  //app.use(cors());
  // Serve static files from the React app
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
  var port = process.env.PORT || 5000 || '0.0.0.0';
  app.listen(port);
  console.log('spotify-social listening on ' + port);
});
//# sourceMappingURL=index.js.map
