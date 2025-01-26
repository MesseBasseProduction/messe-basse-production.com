const express = require('express');
const path = require('path');
const ArtistRouter = express.Router();

const bvbUrls = ['/artist/la-baroquerie-du-val-de-bievre', '/artist/la-baroquerie', '/artist/bvb', '/la-baroquerie-du-val-de-bievre', '/la-baroquerie', '/bvb'];
const bvbPage = (req, res) => {
  console.log(`${(new Date()).toISOString()} | messe-basse-production.com v${global['version']} | 200 ${req.originalUrl} page requested, return baroquerie.html`);
  res.sendFile(path.join(__dirname, '../../../assets/html/artist/baroquerie.html'));  
};
for (let i = 0; i < bvbUrls.length; ++i) {
  ArtistRouter.get(bvbUrls[i], bvbPage);
}

const ddUrls = ['/artist/drop-die', '/artist/dd', '/drop-die', '/dd'];
const ddPage = (req, res) => {
  console.log(`${(new Date()).toISOString()} | messe-basse-production.com v${global['version']} | 200 ${req.originalUrl} page requested, return dropdie.html`);
  res.sendFile(path.join(__dirname, '../../../assets/html/artist/dropdie.html'));  
};
for (let i = 0; i < ddUrls.length; ++i) {
  ArtistRouter.get(ddUrls[i], ddPage);
}

const dvpeUrls = ['/artist/dvpe', '/dvpe'];
const dvpePage = (req, res) => {
  console.log(`${(new Date()).toISOString()} | messe-basse-production.com v${global['version']} | 200 ${req.originalUrl} page requested, return dvpe.html`);
  res.sendFile(path.join(__dirname, '../../../assets/html/artist/dvpe.html'));  
};
for (let i = 0; i < dvpeUrls.length; ++i) {
  ArtistRouter.get(dvpeUrls[i], dvpePage);
}

const fjUrls = ['/artist/five-oclock-jazz-quartet', '/artist/five-oclock', '/five-oclock-jazz-quartet', '/five-oclock'];
const fjPage = (req, res) => {
  console.log(`${(new Date()).toISOString()} | messe-basse-production.com v${global['version']} | 200 ${req.originalUrl} page requested, return fiveoclock.html`);
  res.sendFile(path.join(__dirname, '../../../assets/html/artist/fiveoclock.html'));  
};
for (let i = 0; i < fjUrls.length; ++i) {
  ArtistRouter.get(fjUrls[i], fjPage);
}

const gbUrls = ['/artist/guillaume-beaulieu', '/artist/gb', '/guillaume-beaulieu', '/gb'];
const gbPage = (req, res) => {
  console.log(`${(new Date()).toISOString()} | messe-basse-production.com v${global['version']} | 200 ${req.originalUrl} page requested, return guillaumebeaulieu.html`);
  res.sendFile(path.join(__dirname, '../../../assets/html/artist/guillaumebeaulieu.html'));  
};
for (let i = 0; i < gbUrls.length; ++i) {
  ArtistRouter.get(gbUrls[i], gbPage);
}

const itUrls = ['/artist/interfluv', '/interfluv'];
const itPage = (req, res) => {
  console.log(`${(new Date()).toISOString()} | messe-basse-production.com v${global['version']} | 200 ${req.originalUrl} page requested, return interfluv.html`);
  res.sendFile(path.join(__dirname, '../../../assets/html/artist/interfluv.html'));  
};
for (let i = 0; i < itUrls.length; ++i) {
  ArtistRouter.get(itUrls[i], itPage);
}

const lbUrls = ['/artist/lionel-baudet', '/lionel-baudet'];
const lbPage = (req, res) => {
  console.log(`${(new Date()).toISOString()} | messe-basse-production.com v${global['version']} | 200 ${req.originalUrl} page requested, return lionelbaudet.html`);
  res.sendFile(path.join(__dirname, '../../../assets/html/artist/lionelbaudet.html'));  
};
for (let i = 0; i < lbUrls.length; ++i) {
  ArtistRouter.get(lbUrls[i], lbPage);
}

const ncUrls = ['/artist/nac', '/nac'];
const ncPage = (req, res) => {
  console.log(`${(new Date()).toISOString()} | messe-basse-production.com v${global['version']} | 200 ${req.originalUrl} page requested, return nac.html`);
  res.sendFile(path.join(__dirname, '../../../assets/html/artist/nac.html'));  
};
for (let i = 0; i < ncUrls.length; ++i) {
  ArtistRouter.get(ncUrls[i], ncPage);
}

const scUrls = ['/artist/sire-camara', '/sire-camara'];
const scPage = (req, res) => {
  console.log(`${(new Date()).toISOString()} | messe-basse-production.com v${global['version']} | 200 ${req.originalUrl} page requested, return sirecamara.html`);
  res.sendFile(path.join(__dirname, '../../../assets/html/artist/sirecamara.html'));  
};
for (let i = 0; i < scUrls.length; ++i) {
  ArtistRouter.get(scUrls[i], scPage);
}

const tfUrls = ['/artist/the-forge', '/artist/le-forge', '/artist/macadam-forge', '/artist/small-pox', '/the-forge', '/le-forge', '/macadam-forge', '/small-pox', ];
const tfPage = (req, res) => {
  console.log(`${(new Date()).toISOString()} | messe-basse-production.com v${global['version']} | 200 ${req.originalUrl} page requested, return theforge.html`);
  res.sendFile(path.join(__dirname, '../../../assets/html/artist/theforge.html'));  
};
for (let i = 0; i < tfUrls.length; ++i) {
  ArtistRouter.get(tfUrls[i], tfPage);
}

module.exports = ArtistRouter;
