import '../../scss/mbp.scss';
import Utils from './Utils.js';


class AbstractMBP {


  constructor() {
    this._version = '0.2.0'; // App verison
    this._lang = 'fr'; // By default in french
    this._nls = null; // Translated key/values
    this._dom = null;
    this.evts = new window.CustomEvents();
    this._scroll = null;
  }


  _init() {
    return new Promise((resolve, reject) => {
      this._displayConsoleWelcome();
      this._fetchLang()
        .then(this._translateNav.bind(this))
        .then(this._createMainScroll.bind(this))
        .then(resolve).catch(reject);
    });
  }


  _displayConsoleWelcome() {
    console.log('%cHello, you hacky nerd!', 'font-size:16pt');
    console.log(
      `Do you have some piece of code you want to promote or do you need a hand with it ?\nReach %ccontact@messe-basse-production.com%cso we can find a way to help you!`,
      'text-decoration:underline;color:blue'
    );
  }


  _fetchLang() {
    return new Promise((resolve, reject) => {
      fetch(`/assets/json/nls/${this._lang}.json`).then(data => {
        data.text().then(lang => {
          this._nls = JSON.parse(lang);
          resolve();
        }).catch(reject);
      }).catch(reject);
    });
  }


  _translateNav() {
    return new Promise(resolve => {
      const nav = document.getElementById('navigation');
      Utils.replaceNlsString(nav, 'NAVBAR_CREATION', this._nls.nav.creation);
      Utils.replaceNlsString(nav, 'NAVBAR_EVENTS', this._nls.nav.events);
      Utils.replaceNlsString(nav, 'NAVBAR_ABOUT', this._nls.nav.contact);
      resolve();
    });
  }


  _createMainScroll() {
    return new Promise(resolve => {
      this._scroll = new window.ScrollBar({
        target: document.getElementById('scene'),
        minSize: 200,
        style: {
          color: '#FFBF00'
        }
      });
      resolve();      
    });
  }


  // Called in child class, only when everything is ready on the scene
  _makeSceneVisible() {
    return new Promise(resolve => {
      // Ask for page content to be displayed
      document.getElementById('loading-overlay').style.opacity = 0;
      document.getElementById('scene').style.opacity = 1;
      document.getElementById('navigation').style.opacity = 1;
      this._scroll.updateScrollbar();
      setTimeout(() => {
        document.getElementById('loading-overlay').style.display = 'none';
        document.getElementById('socials').style.opacity = 1;
        resolve();
      }, 200);
    });
  }


  _updateLocation(target) {
    document.getElementById('loading-overlay').style.display = 'block';
    document.getElementById('loading-overlay').style.opacity = 1;
    setTimeout(() => {
      window.location = `/${target}`;
    }, 200); // Match loading-overlay transition timing
  }


}


export default AbstractMBP;

window.addEventListener('popstate', e => {
  if (e.originalEvent.state !== null) {
    location.reload()
  }
});
