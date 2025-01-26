import AbstractMBP from './utils/AbstractMBP.js';
import Utils from './utils/Utils.js';


class CreationPage extends AbstractMBP {


  constructor() {
    super();

    this._init()
      .then(this._initializeCreationPage.bind(this))
      .then(this._translateCreationPage.bind(this))
      .then(this._handleEvents.bind(this))
      .then(this._makeSceneVisible.bind(this));
  }


  _initializeCreationPage() {
    return new Promise((resolve) => {
      this._dom = document.getElementById('scene');
      resolve();
    });
  }


  _translateCreationPage() {
    return new Promise((resolve) => {
      Utils.replaceNlsString(this._dom, 'ORG_MANTRA', this._nls.creation.mantra);
      Utils.replaceNlsString(this._dom, 'ORG_DESCRIPTION', this._nls.creation.description);
      Utils.replaceNlsString(this._dom, 'ORG_DISCOVER', this._nls.creation.discover);

      Utils.replaceNlsString(this._dom, 'ART_MUSIC', this._nls.creation.music);
      Utils.replaceNlsString(this._dom, 'ART_VIDEO', this._nls.creation.video);
      Utils.replaceNlsString(this._dom, 'ART_PODCAST', this._nls.creation.podcast);
      Utils.replaceNlsString(this._dom, 'ART_PHOTO', this._nls.creation.photo);
      Utils.replaceNlsString(this._dom, 'ART_MERCH', this._nls.creation.merch);
      Utils.replaceNlsString(this._dom, 'ART_SOFTWARE', this._nls.creation.software);
      Utils.replaceNlsString(this._dom, 'ART_CATALOG', this._nls.creation.catalog);
      resolve();
    });
  }


  _handleEvents() {
    return new Promise((resolve) => {
      this._dom.querySelector('#music').addEventListener('click', this._updateLocation.bind(this, 'music'));// TODO send nls of id
      this._dom.querySelector('#video').addEventListener('click', this._updateLocation.bind(this, 'video'));// TODO send nls of id
      this._dom.querySelector('#podcast').addEventListener('click', this._updateLocation.bind(this, 'podcast'));// TODO send nls of id
      this._dom.querySelector('#photo').addEventListener('click', this._updateLocation.bind(this, 'photo'));// TODO send nls of id
      this._dom.querySelector('#merch').addEventListener('click', this._updateLocation.bind(this, 'merch'));// TODO send nls of id
      this._dom.querySelector('#software').addEventListener('click', this._updateLocation.bind(this, 'software'));// TODO send nls of id
      //this._dom.querySelector('#catalog').addEventListener('click', this._updateLocation.bind(this, 'catalog'));// TODO send nls of id
      resolve();
    });
  }


}


export default CreationPage;
window.CreationPage = new CreationPage();
