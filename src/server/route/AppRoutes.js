const AppUrlsEnum = require('../utils/enum/AppUrlsEnum.js');
const express = require('express');
const path = require('path');
const AppRouter = express.Router();

/* Routing callback method definition */

// Callback method to send a given HTML file to the end-user
const loadAppPage = (req, res, filename) => {
  console.log(`${(new Date()).toISOString()} | messe-basse-production.com v${global['version']} | 200 ${req.originalUrl} page requested, return ${filename}.html`);
  res.sendFile(path.join(__dirname, `../../../assets/html/${filename}.html`));  
};
// Callback method to perform a redirection into a given target
const redirectAppPage = (req, res, redirectionTarget) => {
  console.log(`${(new Date()).toISOString()} | messe-basse-production.com v${global['version']} | 301 ${req.originalUrl} page requested, redirect to ${redirectionTarget}`);
  res.redirect(redirectionTarget);
};
// Method to diget an artist and all its URL variations (main urls and redirection urls)
const defineAppUrls = params => {
  for (let i = 0; i < params.rootUrls.length; ++i) {
    AppRouter.get(params.rootUrls[i], (req, res) => loadAppPage(req, res, params.redirectionTarget));
  }
  for (let i = 0; i < params.redirectUrls.length; ++i) {
    AppRouter.get(params.redirectUrls[i], (req, res) => redirectAppPage(req, res, params.mainUrl));
  }
};

/* App URL definitions */

// We iterate through the AppUrlsEnum, to build for each app routes and redirections
for (let i = 0; i < AppUrlsEnum.length; ++i) {
  defineAppUrls(AppUrlsEnum[i]);
}

module.exports = AppRouter;
