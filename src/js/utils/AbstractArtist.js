import AbstractMBP from './AbstractMBP.js';
import Utils from './Utils.js';


class AbstractArtist extends AbstractMBP {


  constructor() {
    super();
    this._artistData = {};
    this._releases = [];
    this._releasesScroll = {};
  }


  _initArtist() {
    return new Promise((resolve, reject) => {
      this._init()
        .then(this._fetchData.bind(this))
        .then(this._initializeArtistPage.bind(this))
        .then(this._translateArtistPage.bind(this))
        .then(this._buildArtistPage.bind(this))
        .then(this._handleEvents.bind(this))
        .then(this._makeSceneVisible.bind(this))
        .then(resolve).catch(reject);
    });
  }


  _fetchData() {
    return new Promise((resolve, reject) => {
      Utils.fetchData('music').then(data => {
        this._releases = data.releases;
        for (let i = 0; i < data.artists.length; ++i) {
          if (data.artists[i].name === this._name) {
            this._artistData = data.artists[i];
            break;
          }
        }
        resolve();
      }).catch(reject);
    });
  }


  _initializeArtistPage() {
    return new Promise(resolve => {
      this._dom = document.getElementById('scene');
      resolve();
    });
  }


  _translateArtistPage() {
    return new Promise((resolve) => {
      const nav = document.getElementById('navigation');
      Utils.replaceNlsString(nav, 'NAVBAR_CREATION', this._nls.creation.music);
      Utils.replaceNlsString(this._dom, 'ARTIST_SHORT_BIO', this._artistData.shortBio[this._lang]);
      Utils.replaceNlsString(this._dom, 'ARTIST_BIO', this._artistData.bio[this._lang]);
      Utils.replaceNlsString(this._dom, 'ARTIST_BIO_TITLE', this._nls.artist.bioTitle);
      Utils.replaceNlsString(this._dom, 'ARTIST_RELEASES', this._nls.artist.releasesTitle);
      Utils.replaceNlsString(this._dom, 'ARTIST_FIND_ONLINE', this._nls.artist.findOnline.replace('{x}', this._name));
      resolve();
    });
  }


  _buildArtistPage() {
    return new Promise(resolve => {
      for (let i = 0; i < this._artistData.releases.length; ++i) {
        const release = this._releases[this._artistData.releases[i]];
        const album = document.createElement('DIV');
        this._dom.querySelector('#releases-wrapper').appendChild(album);
        album.outerHTML = `
          <div class="album" data-catalog="${this._artistData.releases[i]}">
            <img src="${release.image}" alt="release-cover">
            <div class="album-overlay" data-catalog="${this._artistData.releases[i]}">
              <p>${release.name}</p>
              <p><b>${this._artistData.releases[i]}</b></p>
              <p>${Utils.formatDate(release.date, this._lang)}</p>
              <a href="${release.mainLink}" target="_blank" rel="noreferrer noopener">${this._nls.music.listenOnline}</a>
            </div>
          </div>
        `;
        album.outerHTML.replace('\n', '');
      }

      this._releasesScroll = new window.ScrollBar({
        target: this._dom.querySelector('#releases-wrapper'),
        horizontal: true,
        minSize: 200,
        style: {
          color: '#FFBF00'
        }
      });
      requestAnimationFrame(() => this._releasesScroll.updateScrollbar());

      for (let i = 0; i < this._artistData.links.length; ++i) {
        const link = document.createElement('A');
        link.classList.add('link');
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener');
        link.href = this._artistData.links[i].url;
        link.innerHTML = `<img src="/assets/img/logo/${this._artistData.links[i].type}.svg" alt="release-image" height="60" width="60"><h1>${this._nls.link[this._artistData.links[i].type]}</h1>`
        this._dom.querySelector('#links-grid').appendChild(link);
      }
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


export default AbstractArtist;
