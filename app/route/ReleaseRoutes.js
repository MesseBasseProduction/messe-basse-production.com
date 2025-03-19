const ReleasesUrlsEnum = require('../utils/enum/ReleasesUrlsEnum.js');
const express = require('express');
const ReleaseRouter = express.Router();

const loadReleasePage = (req, res, catalog) => {
  console.log(`${(new Date()).toISOString()} | ${global['url']} v${global['version']} | 200 ${req.originalUrl} page requested, return release.handlebars for ${catalog}`);
  res.render('subpages/release' , {
    info: {
      catalog: catalog
    }
  });
};
// Callback method to perform a redirection into a given target
const redirectReleasePage = (req, res, params) => {
  const redirectionTarget = (req.query.lang === 'en') ? params.entarget : params.frtarget;
  console.log(`${(new Date()).toISOString()} | ${global['url']} v${global['version']} | 301 ${req.originalUrl} page requested, redirect to ${redirectionTarget}`);
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
