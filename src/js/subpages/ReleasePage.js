import AbstractMBP from '../utils/AbstractMBP.js';
import Utils from '../utils/Utils.js';


class ReleasePage extends AbstractMBP {


  constructor() {
    super();
    this._artistData = {};
    this._release = {};
    this._name = document.body.dataset.catalog;
    this._initRelease();
  }


  _initRelease() {
    return new Promise((resolve, reject) => {
      this._init()
        .then(this._fetchData.bind(this))
        .then(this._initializeReleasePage.bind(this))
        .then(this._translateReleasePage.bind(this))
        .then(this._buildReleasePage.bind(this))
        .then(this._handleEvents.bind(this))
        .then(this._makeSceneVisible.bind(this))
        .then(resolve).catch(reject);
    });
  }


  _fetchData() {
    return new Promise((resolve, reject) => {
      Utils.fetchData('music').then(data => {
        this._release = data.releases[this._name];
        // for (let i = 0; i < data.artists.length; ++i) {
        //   if (data.artists[i].name === this._name) {
        //     this._artistData = data.artists[i];
        //     break;
        //   }
        // }
        resolve();
      }).catch(reject);
    });
  }


  _initializeReleasePage() {
    return new Promise(resolve => {
      this._dom = document.getElementById('scene');
      resolve();
    });
  }


  _translateReleasePage() {
    return new Promise((resolve) => {
//      Utils.replaceNlsString(this._dom, 'ARTIST_SHORT_BIO', this._artistData.shortBio[this._lang]);
      resolve();
    });
  }


  _buildReleasePage() {
    return new Promise(resolve => {
      this._dom.querySelector('#album-title').innerHTML = this._release.name;
      this._dom.querySelector('#album-artist').innerHTML = this._release.artist.join(',');

      const links = document.createElement('DIV');
      for (let i = 0; i < this._release.links.length; ++i) {
        const link = document.createElement('P');
        link.innerHTML = `
          <a href="${this._release.links[i].url}" target="_blank" rel="noopener noreferrer">
            <img src="/assets/img/logo/${this._release.links[i].type}.svg" alt="link-${this._release.links[i].type}">
            <span>${this._nls.link[this._release.links[i].type]}</span>
          </a>
        `;
        links.appendChild(link);
      }

      const tracklist = document.createElement('DIV');
      for (let i = 0; i < this._release.tracks.length; ++i) {
        const track = document.createElement('DIV');
        track.classList.add('track');

        const credits = document.createElement('DIV');
        for (let j = 0; j < this._release.tracks[i].credits.length; ++j) {
          const credit = document.createElement('P');
          const key = Object.keys(this._release.tracks[i].credits[j]);
          credit.innerHTML = `<i>${this._nls.role[key]}</i> : ${this._release.tracks[i].credits[j][key]}`;
          credits.appendChild(credit);
        }

        track.innerHTML = `
          <p>${i + 1}</p>
          <p>${this._release.tracks[i].title}</p>
          <p>${this._release.tracks[i].artist.join(',')}</p>
          <p>${this._release.tracks[i].duration}</p>
          <div class="track-info">
            ${credits.innerHTML}
            <p><i>ISRC</i> : ${this._release.tracks[i].ISRC}</p>
          </div>
        `;
        tracklist.appendChild(track);
      }

      this._dom.querySelector('.album-wrapper').innerHTML = `
        <div class="album-credits">
          <img src="${this._release.image}" class="album-artwork">
          <div class="album-links">${links.innerHTML}</div>
        </div>
        <div class="album-content">
          <div class="album-info">
            <h3>${this._release.name} - ${this._release.artist.join(',')}</h3>
            <h4>Publié le ${Utils.formatDate(this._release.date, this._lang)}</h4>
          </div>
          <div class="album-tracklist">${tracklist.innerHTML}</div>
        </div>
      `;
      resolve();
    });
  }


  _handleEvents() {
    return new Promise(resolve => {
      this._dom.querySelector('#back-button').addEventListener('click', this._updateLocation.bind(this, 'music'));
      /*const children = this._dom.querySelector('#releases-wrapper').firstElementChild.firstElementChild.children;
      for (let i = 0; i < children.length; ++i) {
        children[i].addEventListener('click', e => {
//TODO release page          this._updateLocation();
        })
      }*/
      resolve();
    });
  }


}


export default ReleasePage;
