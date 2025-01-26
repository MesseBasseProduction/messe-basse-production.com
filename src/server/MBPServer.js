const express = require('express');
const path = require('path');
const compression = require('compression');
const zlib = require('node:zlib');

global['version'] = '0.2.0';
const port = 8070;
const app = express();

console.log(`${(new Date()).toISOString()} | messe-basse-production.com v${version} | Starting express.js server`);

// Ensure responses are compressed through this midleware
app.use(compression({
  level: zlib.constants.Z_BEST_COMPRESSION,
}));

// URL definitions and routing
const appRoutes = require('./route/AppRoutes');
app.use('/', appRoutes);

const artistRoutes = require('./route/ArtistRoutes');
app.use('/', artistRoutes);

app.use('/assets', express.static(path.join(__dirname, '../../assets'), { // Serve static files
  maxAge: '864000000' // 10 days caching for app assets
}));
app.use('/tree', express.static(path.join(__dirname, '../../tree'), { // Serve artist link trees
  maxAge: '864000000' // 10 days caching for artist link tree
}));

// Start server console
app.listen(port, () => {
  console.log(`${(new Date()).toISOString()} | messe-basse-production.com v${version} | Server started and listening on port ${port}`);
});
