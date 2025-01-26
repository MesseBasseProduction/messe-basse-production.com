import AbstractMBP from '../utils/AbstractMBP.js';
import Utils from '../utils/Utils.js';


class CatalogPage extends AbstractMBP {


  constructor() {
    super();

    this._catalogData = {};

    this._init()
      .then(this._initializeCatalogPage.bind(this))
      .then(this._translateCatalogPage.bind(this))
      .then(this._buildCatalogPage.bind(this))
      .then(this._handleEvents.bind(this))
      .then(this._makeSceneVisible.bind(this));
  }


  _initializeCatalogPage() {
    return new Promise((resolve, reject) => {
      this._dom = document.getElementById('scene');
      Utils.fetchData('music').then(data => {
        this._catalogData = data;
        resolve();
      }).catch(reject);
    });
  }


  _translateCatalogPage() {
    return new Promise((resolve) => {
      const nav = document.getElementById('navigation');
      Utils.replaceNlsString(nav, 'NAVBAR_CREATION', this._nls.creation.catalog);
//      Utils.replaceNlsString(this._dom, 'CATALOG_TITLE', this._nls.merch.music);
//      Utils.replaceNlsString(this._dom, 'CATALOG_DESCRIPTION', this._nls.merch.apparel);
      resolve();
    });
  }


  _buildCatalogPage() {
    return new Promise(resolve => {
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


export default CatalogPage;
window.CatalogPage = new CatalogPage();
