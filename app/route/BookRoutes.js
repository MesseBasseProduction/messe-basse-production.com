const BooksUrlsEnum = require('../utils/enum/BooksUrlsEnum.js');
const express = require('express');
const ReleaseRouter = express.Router();

const loadBookPage = (req, res, catalog) => {
  console.log(catalog)
  console.log(`${(new Date()).toISOString()} | ${global['url']} v${global['version']} | 200 ${req.originalUrl} page requested, return release.handlebars for ${catalog}`);
  res.render(`subpages/books/${catalog}`, {
    info: {
      catalog: catalog
    }
  });
};
// Callback method to perform a redirection into a given target
const redirectBookPage = (req, res, params) => {
  const redirectionTarget = (req.query.lang === 'en') ? params.entarget : params.frtarget;
  console.log(`${(new Date()).toISOString()} | ${global['url']} v${global['version']} | 301 ${req.originalUrl} page requested, redirect to ${redirectionTarget}`);
  res.redirect(redirectionTarget);
};

const defineBookUrls = params => {
  ReleaseRouter.get(params.frtarget, (req, res) => loadBookPage(req, res, params.inputUrl.replace('/', '')));
  ReleaseRouter.get(params.entarget, (req, res) => loadBookPage(req, res, params.inputUrl.replace('/', '')));
  ReleaseRouter.get(params.inputUrl, (req, res) => redirectBookPage(req, res, params));
};

// We iterate through the BooksUrlsEnum, to build for each app routes and redirections
for (let i = 0; i < BooksUrlsEnum.length; ++i) {
  defineBookUrls(BooksUrlsEnum[i]);
}

module.exports = ReleaseRouter;
