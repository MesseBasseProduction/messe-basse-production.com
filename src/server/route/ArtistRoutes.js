const ArtistsUrlsEnum = require('../utils/enum/ArtistsUrlsEnum.js');
const express = require('express');
const path = require('path');
const ArtistRouter = express.Router();

/* Routing callback method definition */

// Callback method to send a given HTML file to the end-user
const loadArtistPage = (req, res, filename) => {
  console.log(`${(new Date()).toISOString()} | messe-basse-production.com v${global['version']} | 200 ${req.originalUrl} page requested, return ${filename}.html`);
  res.sendFile(path.join(__dirname, `../../../assets/html/artist/${filename}.html`));  
};
// Callback method to perform a redirection into a given target
const redirectArtistPage = (req, res, redirectionTarget) => {
  console.log(`${(new Date()).toISOString()} | messe-basse-production.com v${global['version']} | 301 ${req.originalUrl} page requested, redirect to ${redirectionTarget}`);
  res.redirect(redirectionTarget);
};
// Method to diget an artist and all its URL variations (main urls and redirection urls)
const defineArtistUrls = params => {
  for (let i = 0; i < params.rootUrls.length; ++i) {
    ArtistRouter.get(params.rootUrls[i], (req, res) => loadArtistPage(req, res, params.redirectionTarget));
  }
  for (let i = 0; i < params.redirectUrls.length; ++i) {
    ArtistRouter.get(params.redirectUrls[i], (req, res) => redirectArtistPage(req, res, params.mainUrl));
  }
};

/* Artist URL definitions */

// We iterate through the ArtistsUrlsEnum, to build for each artist routes and redirections
for (let i = 0; i < ArtistsUrlsEnum.length; ++i) {
  defineArtistUrls(ArtistsUrlsEnum[i]);
}

module.exports = ArtistRouter;
