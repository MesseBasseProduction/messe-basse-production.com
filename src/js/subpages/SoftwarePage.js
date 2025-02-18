import AbstractMBP from '../utils/AbstractMBP.js';
import Utils from '../utils/Utils.js';


class SoftwarePage extends AbstractMBP {


  constructor() {
    super();

    this._softwareData = {};

    this._init()
      .then(this._initializeSoftwarePage.bind(this))
      .then(this._translateSoftwarePage.bind(this))
      .then(this._buildSoftwarePage.bind(this))
      .then(this._handleEvents.bind(this))
      .then(this._makeSceneVisible.bind(this));
  }


  _initializeSoftwarePage() {
    return new Promise((resolve, reject) => {
      this._dom = document.getElementById('scene');
      Utils.fetchData('software').then(data => {
        this._softwareData = data;
        resolve();
      }).catch(reject);
    });
  }


  _translateSoftwarePage() {
    return new Promise((resolve) => {
      Utils.replaceNlsString(this._dom, 'SOFTWARE_TITLE', this._nls.software.title);
      Utils.replaceNlsString(this._dom, 'SOFTWARE_DESCRIPTION1', this._nls.software.description1);
      Utils.replaceNlsString(this._dom, 'SOFTWARE_DESCRIPTION2', this._nls.software.description2);
      Utils.replaceNlsString(this._dom, 'SOFTWARE_CREATION', this._nls.software.creation);
      Utils.replaceNlsString(this._dom, 'SOFTWARE_ARTISTS_WEBSITE', this._nls.software.artistsWebsite);
      resolve();
    });
  }


  _buildSoftwarePage() {
    return new Promise(resolve => {
      for (let i = 0; i < this._softwareData.creation.length; ++i) {
        const website = document.createElement('DIV');
        website.classList.add('website');
        website.dataset.url = this._softwareData.creation[i].url;
        website.innerHTML = `
          <img src="${this._softwareData.creation[i].image}" alt="mbp-website">
          <h2>${this._softwareData.creation[i].name}</h2>
          <p>${this._softwareData.creation[i].bio[this._lang]}</p>
        `;
        website.addEventListener('click', () => {
          window.open(website.dataset.url, '_blank', 'noopener, noreferrer');
        });
        this._dom.querySelector('#mbp-website-grid').appendChild(website);
      }

      for (let i = 0; i < this._softwareData.artists.length; ++i) {
        const website = document.createElement('DIV');
        website.classList.add('website');
        website.dataset.url = this._softwareData.artists[i].url;
        website.innerHTML = `
          <img src="${this._softwareData.artists[i].image}" alt="mbp-website">
          <h2>${this._softwareData.artists[i].name}</h2>
        `;
        website.addEventListener('click', () => {
          window.open(website.dataset.url, '_blank', 'noopener, noreferrer');
        });
        this._dom.querySelector('#band-website-grid').appendChild(website);
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


export default SoftwarePage;
window.SoftwarePage = new SoftwarePage();
