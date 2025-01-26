const express = require('express');
const path = require('path');
const AppRouter = express.Router();

/* MainPages */

const creationUrls = ['/', '/creation', '/accueil', '/home'];
const creationPage = (req, res) => {
  console.log(`${(new Date()).toISOString()} | messe-basse-production.com v${global['version']} | 200 ${req.originalUrl} page requested, return creation.html`);
  res.sendFile(path.join(__dirname, '../../../assets/html/creation.html'));  
};
for (let i = 0; i < creationUrls.length; ++i) {
  AppRouter.get(creationUrls[i], creationPage);
}

const eventUrls = ['/evenement', '/event'];
const eventPage = (req, res) => {
  console.log(`${(new Date()).toISOString()} | messe-basse-production.com v${global['version']} | 200 ${req.originalUrl} page requested, return events.html`);
  res.sendFile(path.join(__dirname, '../../../assets/html/events.html'));  
};
for (let i = 0; i < eventUrls.length; ++i) {
  AppRouter.get(eventUrls[i], eventPage);
}

const contactUrls = ['/contact'];
const contactPage = (req, res) => {
  console.log(`${(new Date()).toISOString()} | messe-basse-production.com v${global['version']} | 200 ${req.originalUrl} page requested, return contact.html`);
  res.sendFile(path.join(__dirname, '../../../assets/html/contact.html'));  
};
for (let i = 0; i < contactUrls.length; ++i) {
  AppRouter.get(contactUrls[i], contactPage);
}

/* SubPages */

const catalogUrls = ['/catalogue', '/catalog'];
const catalogPage = (req, res) => {
  console.log(`${(new Date()).toISOString()} | messe-basse-production.com v${global['version']} | 200 ${req.originalUrl} page requested, return catalog.html`);
  res.sendFile(path.join(__dirname, '../../../assets/html/subpages/catalog.html'));  
};
for (let i = 0; i < catalogUrls.length; ++i) {
  AppRouter.get(catalogUrls[i], catalogPage);
}

const merchUrls = ['/produit', '/merch'];
const merchPage = (req, res) => {
  console.log(`${(new Date()).toISOString()} | messe-basse-production.com v${global['version']} | 200 ${req.originalUrl} page requested, return merch.html`);
  res.sendFile(path.join(__dirname, '../../../assets/html/subpages/merch.html'));  
};
for (let i = 0; i < merchUrls.length; ++i) {
  AppRouter.get(merchUrls[i], merchPage);
}

const musicUrls = ['/musique', '/music'];
const musicPage = (req, res) => {
  console.log(`${(new Date()).toISOString()} | messe-basse-production.com v${global['version']} | 200 ${req.originalUrl} page requested, return music.html`);
  res.sendFile(path.join(__dirname, '../../../assets/html/subpages/music.html'));  
};
for (let i = 0; i < musicUrls.length; ++i) {
  AppRouter.get(musicUrls[i], musicPage);
}

const photoUrls = ['/photo'];
const photoPage = (req, res) => {
  console.log(`${(new Date()).toISOString()} | messe-basse-production.com v${global['version']} | 200 ${req.originalUrl} page requested, return photo.html`);
  res.sendFile(path.join(__dirname, '../../../assets/html/subpages/photo.html'));  
};
for (let i = 0; i < photoUrls.length; ++i) {
  AppRouter.get(photoUrls[i], photoPage);
}

const podcastUrls = ['/podcast'];
const podcastPage = (req, res) => {
  console.log(`${(new Date()).toISOString()} | messe-basse-production.com v${global['version']} | 200 ${req.originalUrl} page requested, return podcast.html`);
  res.sendFile(path.join(__dirname, '../../../assets/html/subpages/podcast.html'));  
};
for (let i = 0; i < podcastUrls.length; ++i) {
  AppRouter.get(podcastUrls[i], podcastPage);
}

const softwareUrls = ['/logiciel', '/software'];
const softwarePage = (req, res) => {
  console.log(`${(new Date()).toISOString()} | messe-basse-production.com v${global['version']} | 200 ${req.originalUrl} page requested, return software.html`);
  res.sendFile(path.join(__dirname, '../../../assets/html/subpages/software.html'));  
};
for (let i = 0; i < softwareUrls.length; ++i) {
  AppRouter.get(softwareUrls[i], softwarePage);
}

const videoUrls = ['/video'];
const videoPage = (req, res) => {
  console.log(`${(new Date()).toISOString()} | messe-basse-production.com v${global['version']} | 200 ${req.originalUrl} page requested, return video.html`);
  res.sendFile(path.join(__dirname, '../../../assets/html/subpages/video.html'));  
};
for (let i = 0; i < videoUrls.length; ++i) {
  AppRouter.get(videoUrls[i], videoPage);
}

module.exports = AppRouter;
