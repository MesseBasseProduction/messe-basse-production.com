import '../../scss/mbp.scss';
import Utils from './Utils.js';


class AbstractMBP {


  constructor() {
    this._version = '0.2.2'; // App verison
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


  _sharedEvents() {
    return new Promise(resolve => {
      this._dom.querySelector('#credit-modal').addEventListener('click', this._openCreditModal.bind(this));
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
      // Ensure the overlay is removed after calling location move. Avoid issues hitting browser back button
      setTimeout(() => {
        document.getElementById('loading-overlay').style.opacity = 0;
        document.getElementById('loading-overlay').style.display = 'none';        
      }, 400);
      window.location = `/${target}`;
    }, 200); // Match loading-overlay transition timing
  }


  _openCreditModal() {
    Utils.fetchPage('/modal/credit.html').then(dom => {
      const modal = document.createElement('DIV');
      modal.classList.add('modal');
      modal.classList.add('credit');
      modal.appendChild(dom);

      Utils.replaceNlsString(modal, 'ABOUT_TITLE', this._nls.aboutTitle);
      Utils.replaceNlsString(modal, 'ABOUT_DESCRIPTION1', this._nls.aboutDescription1);
      Utils.replaceNlsString(modal, 'ABOUT_DESCRIPTION2', this._nls.aboutDescription2);
      Utils.replaceNlsString(modal, 'ABOUT_DESCRIPTION3', this._nls.aboutDescription3);
      Utils.replaceNlsString(modal, 'ABOUT_DESCRIPTION4', this._nls.aboutDescription4);
      Utils.replaceNlsString(modal, 'ABOUT_CLOSE', this._nls.aboutClose);

      document.getElementById('overlay').appendChild(modal);
      // Modal opening/closing animation
      const closeModal = e => {
        if (['overlay', 'close-modal'].indexOf(e.target.id) === -1) {
          return;
        }
  
        document.getElementById('overlay').style.opacity = 0;
        setTimeout(() => {
          document.getElementById('overlay').style.display = 'none';
          document.getElementById('overlay').innerHTML = '';
        }, 300);
      };
  
      document.getElementById('overlay').style.display = 'flex';
      setTimeout(() => document.getElementById('overlay').style.opacity = 1, 100);
      setTimeout(() => {
        modal.style.opacity = 1;
        document.getElementById('overlay').addEventListener('click', closeModal);
        document.getElementById('close-modal').addEventListener('click', closeModal);
      }, 200);
    });
  }


}


export default AbstractMBP;
