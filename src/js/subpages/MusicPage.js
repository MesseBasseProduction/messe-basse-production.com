import AbstractMBP from '../utils/AbstractMBP.js';
import Utils from '../utils/Utils.js';


class MusicPage extends AbstractMBP {


  constructor() {
    super();

    this._musicData = {};
    this._scrolls = [];

    this._init()
      .then(this._initializeMusicPage.bind(this))
      .then(this._translateMuserPage.bind(this))
      .then(this._buildMusicPage.bind(this))
      .then(this._handleEvents.bind(this))
      .then(this._makeSceneVisible.bind(this));
  }


  _initializeMusicPage() {
    return new Promise((resolve, reject) => {
      this._dom = document.getElementById('scene');
      Utils.fetchData('music').then(data => {
        this._musicData = data;
        resolve();
      }).catch(reject);
    });
  }


  _translateMuserPage() {
    return new Promise((resolve) => {
      const nav = document.getElementById('navigation');
      Utils.replaceNlsString(nav, 'NAVBAR_CREATION', this._nls.creation.music);
      Utils.replaceNlsString(this._dom, 'MUSIC_TITLE', this._nls.music.title);
      Utils.replaceNlsString(this._dom, 'MUSIC_DESCRIPTION', this._nls.music.description);
      resolve();
    });
  }


  _buildMusicPage() {
    return new Promise(resolve => {
      for (let i = 0; i < this._musicData.artists.length; ++i) {
        const band = document.createElement('DIV');
        band.classList.add('band');

        const bandImage = document.createElement('IMG');
        bandImage.src = this._musicData.artists[i].image;
        band.appendChild(bandImage);

        const bandName = document.createElement('P');
        bandName.innerHTML = this._musicData.artists[i].name;
        band.appendChild(bandName);

        band.addEventListener('click', this._updateLocation.bind(this, `artist/${this._musicData.artists[i].internalUrl}`));
        this._dom.querySelector('#musicians-grid').appendChild(band);
      }
      resolve();
    });
  }


  _handleEvents() {
    return new Promise(resolve => {
      this._dom.querySelector('#back-button').addEventListener('click', this._updateLocation.bind(this, 'creation'));
      resolve();
    });
  }


}


export default MusicPage;
window.MusicPage = new MusicPage();
