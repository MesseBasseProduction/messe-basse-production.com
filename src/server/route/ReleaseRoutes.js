const ReleasesUrlsEnum = require('../utils/enum/ReleasesUrlsEnum.js');
const express = require('express');
const path = require('path');
const ReleaseRouter = express.Router();

const loadReleasePage = (req, res, catalog) => {
  console.log(`${(new Date()).toISOString()} | messe-basse-production.com v${global['version']} | 200 ${req.originalUrl} page requested, return audio-release.pug template for ${catalog}`);
  res.render(path.join(__dirname, '../../../assets/html/release/audio-release.pug'), {
    pageTitle: '| Messe Basse Production',
    pageDescription: 'DATA',
    catalog: catalog
  });
};
// Callback method to perform a redirection into a given target
const redirectReleasePage = (req, res, params) => {
  const redirectionTarget = (req.query.lang === 'en') ? params.entarget : params.frtarget;
  console.log(req.get('Accept-Language'));
  console.log(`${(new Date()).toISOString()} | messe-basse-production.com v${global['version']} | 301 ${req.originalUrl} page requested, redirect to ${redirectionTarget}`);
  res.redirect(redirectionTarget);
};

const defineReleaseUrls = params => {
  ReleaseRouter.get(params.frtarget, (req, res) => loadReleasePage(req, res, params.inputUrl.replace('/', '')));
  ReleaseRouter.get(params.entarget, (req, res) => loadReleasePage(req, res, params.inputUrl.replace('/', '')));
  ReleaseRouter.get(params.inputUrl, (req, res) => redirectReleasePage(req, res, params));
};

// We iterate through the AppUrlsEnum, to build for each app routes and redirections
for (let i = 0; i < ReleasesUrlsEnum.length; ++i) {
  defineReleaseUrls(ReleasesUrlsEnum[i]);
}

module.exports = ReleaseRouter;
