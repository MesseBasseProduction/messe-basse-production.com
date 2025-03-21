import AbstractMBP from '../utils/AbstractMBP.js';
import Utils from '../utils/Utils.js';


class CatalogPage extends AbstractMBP {


  constructor() {
    super();

    this._data = {};
    this._releases = [];

    this._init()
      .then(this._initializeCatalogPage.bind(this))
      .then(this._translateCatalogPage.bind(this))
      .then(this._buildCatalogPage.bind(this))
      .then(this._handleEvents.bind(this))
      .then(this._sharedEvents.bind(this))
      .then(this._makeSceneVisible.bind(this));
  }


  _initializeCatalogPage() {
    return new Promise((resolve, reject) => {
      this._dom = document.getElementById('scene');
      Utils.fetchData('music').then(data => {
        this._data = data;
        const keys = Object.keys(this._data.releases);
        for (let i = 0; i < keys.length; ++i) {
          const release = this._data.releases[keys[i]];
          release.catalog = keys[i];
          this._releases.push(release);
        }
        // Sorting releases by date
        this._releases.sort((a,b) => {
          return (a.date < b.date) ? -1 : (a.date > b.date) ? 1 : 0;
        });
        resolve();
      }).catch(reject);
    });
  }


  _translateCatalogPage() {
    return new Promise((resolve) => {
      Utils.replaceNlsString(this._dom, 'CATALOG_TITLE', this._nls.catalog.title);
      Utils.replaceNlsString(this._dom, 'CATALOG_DESCRIPTION', this._nls.catalog.description.replace('{x}', this._releases.length));
      resolve();
    });
  }


  _buildCatalogPage() {
    return new Promise(resolve => {
      const albums = this._dom.querySelector('#released-material');
      for (let i = this._releases.length - 1; i >= 0; --i) {
        const album = this.__buildRelease(this._releases[i]);
        albums.appendChild(album);
      }
      resolve();
    });
  }


  __buildRelease(data) {
    const releaseWrapper = document.createElement('DIV');
    releaseWrapper.classList.add('release-wrapper');

    const releaseContainer = document.createElement('DIV');
    releaseContainer.classList.add('release-container');    

    const front = document.createElement('DIV');
    front.classList.add('front');
    const image = document.createElement('IMG');
    image.src = data.image;
    const catalog = document.createElement('P');
    catalog.innerHTML = data.catalog;
    front.appendChild(image);
    front.appendChild(catalog);

    const back = document.createElement('DIV');
    back.classList.add('back');
    const artistPP = document.createElement('IMG');
    artistPP.src = this.__findMatchingArtistPP(data);
    const artist = document.createElement('H3');
    artist.innerHTML = data.artist.join(', ');
    const name = document.createElement('H2');
    name.innerHTML = data.name;
    const date = document.createElement('P');
    date.innerHTML = Utils.formatDate(data.date, this._lang);
    back.appendChild(artistPP);
    back.appendChild(artist);
    back.appendChild(name);
    back.appendChild(date);

    releaseContainer.appendChild(front);
    releaseContainer.appendChild(back);
    releaseWrapper.appendChild(releaseContainer);

    releaseWrapper.addEventListener('click', () => {
      this._updateLocation(`${data.catalog}?lang=${this._lang}`);
    });

    return releaseWrapper;
  }


  __findMatchingArtistPP(release) {
    let output = '';
    for (let i = 0; i < this._data.artists.length; ++i) {
      if (release.artist.indexOf(this._data.artists[i].name) !== -1) {
        output = this._data.artists[i].image;
        break;
      }
    }
    // Case down and remove all spaces, find matching band then
    if (output === '') {
      output = `/assets/img/band/${release.artist[0].replaceAll(' ', '').toLowerCase()}.webp`;
    }

    return output;
  }


  _handleEvents() {
    return new Promise(resolve => {
      this._dom.querySelector('#back-button').addEventListener('click', this._loadPreviousPage.bind(this));
      resolve();
    });
  }


}


export default CatalogPage;
window.CatalogPage = new CatalogPage();
