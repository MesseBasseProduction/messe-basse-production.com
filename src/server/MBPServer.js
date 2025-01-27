const express = require('express');
const path = require('path');
const compression = require('compression');
const zlib = require('node:zlib');

global['url'] = 'https://messe-basse-production.com'; // Ensure no slash at the end
global['version'] = '0.2.1';
const port = 8070;
const app = express();

console.log(`${(new Date()).toISOString()} | messe-basse-production.com v${version} | Starting express.js server`);

// Ensure responses are compressed through this midleware
app.use(compression({
  level: zlib.constants.Z_BEST_COMPRESSION,
}));

// Allow template rendering using pug
app.set('views engine', 'pug');

// URL definitions and routing
const appRoutes = require('./route/AppRoutes');
const artistRoutes = require('./route/ArtistRoutes');
const releaseRoutes = require('./route/ReleaseRoutes');
app.use('/', appRoutes);
app.use('/', artistRoutes);
app.use('/', releaseRoutes);

app.use('/assets', express.static(path.join(__dirname, '../../assets'), { // Serve static files
  maxAge: '864000000' // 10 days caching for app assets
}));
app.use('/tree', express.static(path.join(__dirname, '../../tree'), { // Serve artist link trees
  maxAge: '864000000' // 10 days caching for artist link tree
}));

// Now update sitemap with given routes
require('./utils/SiteMapGenerator.js')([appRoutes, artistRoutes], () => {
  // Start server console
  app.listen(port, () => {
    console.log(`${(new Date()).toISOString()} | messe-basse-production.com v${version} | Server started and listening on port ${port}`);
  });
});
