import '../scss/mbp.scss';
import Home from './pages/Home.js';
import Creation from './pages/Creation.js';
import Events from './pages/Events.js';
import Merch from './pages/Merch.js';
import Contact from './pages/Contact.js';

import Utils from './utils/Utils.js';


class MBP {


  constructor() {
    this._lang = 'en';
    this._nls = null;
    this._version = '0.1.3';
    this.evts = new window.CustomEvents();

    this._scroll = null;
    this._currentPage = 'home';

    this._homePage = null;
    this._creationPage = null;
    this._eventsPage = null;
    this._merchPage = null;
    this._contactPage = null;
    // Fetch lang  
    this._fetchLang().then(() => {
      // First stack of async call for HomePage building
      this._translateNav()
        .then(this._buildHomepage.bind(this))
        .then(this._endLoading.bind(this))
        .then(this._animateNav.bind(this));
      // Second async stack is building other pages
      this._buildPages()
        .then(this._events.bind(this));

      this._displayConsoleWelcome();
    });
  }


  /* Initialization sequence */
  // During text logo animation, fetch lang, update UI, build other componenets


  _fetchLang() {
    return new Promise((resolve, reject) => {
      fetch(`assets/json/nls/${this._lang}.json`).then(data => {
        data.text().then(lang => {
          this._nls = JSON.parse(lang);
          resolve();
        }).catch(reject);
      }).catch(reject);
    });
  }


  /* Initializing nav bar and homepage, and handle end of loading animation */


  _translateNav() {
    return new Promise(resolve => {
      const nav = document.getElementById('navigation');
      Utils.replaceString(nav, '{{NAVBAR_HOME}}', this._nls.nav.home);
      Utils.replaceString(nav, '{{NAVBAR_CREATION}}', this._nls.nav.creation);
      Utils.replaceString(nav, '{{NAVBAR_EVENTS}}', this._nls.nav.events);
      Utils.replaceString(nav, '{{NAVBAR_MERCH}}', this._nls.nav.merch);
      Utils.replaceString(nav, '{{NAVBAR_CONTACT}}', this._nls.nav.contact);
      resolve();
    });
  }


  _buildHomepage() {
    return new Promise(resolve => {
      // Constructor of Home will automatically translate and replace HTML content
      // Because it is the first displayed page, it has this special init.
      this._homePage = new Home({
        lang: this._lang,
        nls: this._nls.home
      });
      resolve();
    });
  }


  _endLoading() {
    return new Promise(resolve => {
      // Set a timeout on logo hiding to let the css text animation to complete
      setTimeout(() => {
        document.body.removeChild(document.getElementById('flashing-text-logo'));
        // Ask for page content to be displayed
        document.getElementById('scene').style.opacity = 1;
        resolve();
      }, 4000);
    });
  }


  _animateNav() {
    return new Promise(resolve => {			
      // Launch navigation items animation (descending from top screen)
      document.getElementById('navigation').style.opacity = 1;
      setTimeout(() => {
        document.getElementById('link-home').style.animation = 'drop-nav-link 1.4s forwards';
        document.getElementById('link-home').style.opacity = 1;
      }, 100);
      setTimeout(() => {
        document.getElementById('link-creation').style.animation = 'drop-nav-link 1.3s forwards';
        document.getElementById('link-creation').style.opacity = 1;
      }, 200);
      setTimeout(() => {
        document.getElementById('link-events').style.animation = 'drop-nav-link 1.2s forwards';
        document.getElementById('link-events').style.opacity = 1;
      }, 300);
      setTimeout(() => {
        document.getElementById('link-merch').style.animation = 'drop-nav-link 1.1s forwards';
        document.getElementById('link-merch').style.opacity = 1;
      }, 400);
      setTimeout(() => {
        document.getElementById('link-contact').style.animation = 'drop-nav-link 1s forwards';
        document.getElementById('link-contact').style.opacity = 1;
      }, 500);
      setTimeout(() => {
        document.getElementById('socials').style.opacity = 1;
        resolve();
      }, 1250);
    });
  }


  /* Initializing other pages in background */


  _buildPages() {
    return new Promise(resolve => {
      this._creationPage = new Creation({
        lang: this._lang,
        nls: this._nls.creation
      });
      this._eventsPage = new Events({
        lang: this._lang,
        nls: this._nls.events
      });
      this._merchPage = new Merch({
        lang: this._lang,
        nls: this._nls.merch
      });
      this._contactPage = new Contact({
        lang: this._lang,
        nls: this._nls.contact
      });
      resolve();
    });
  }


  _events() {
    document.getElementById('link-home').addEventListener('click', this._switchView.bind(this, 'home'));
    document.getElementById('link-creation').addEventListener('click', this._switchView.bind(this, 'creation'));
    document.getElementById('link-events').addEventListener('click', this._switchView.bind(this, 'events'));
    document.getElementById('link-merch').addEventListener('click', this._switchView.bind(this, 'merch'));
    document.getElementById('link-contact').addEventListener('click', this._switchView.bind(this, 'contact'));
  }


  /* View navigation */


  _switchView(target) {
    // Start hide animation
    document.getElementById('scene').style.opacity = 0;
    // Update nav selected item
    document.getElementById(`link-${this._currentPage}`).classList.remove('selected');
    document.getElementById(`link-${target}`).classList.add('selected');
    // Get DOM from pages
    let dom = null;
    switch (target) {
      case 'home':
        dom = this._homePage.dom;
        break;
      case 'creation':
        dom = this._creationPage.dom;
        break;
      case 'events':
        dom = this._eventsPage.dom;
        break;
      case 'merch':
        dom = this._merchPage.dom;
        break;
      case 'contact':
        dom = this._contactPage.dom;
        break;
      default:
        dom = this._homePage.dom;
        break;
    }
    // After opacity animation done, perform view switch
    setTimeout(() => {
      document.getElementById('scene').classList.remove(this._currentPage);
      document.getElementById('scene').classList.add(target);
      this._currentPage = target; // Updated stored current page
      document.getElementById('scene').innerHTML = '';
      document.getElementById('scene').appendChild(dom);
      requestAnimationFrame(() => {
        document.getElementById('scene').style.opacity = 1;
        this._scroll = new window.ScrollBar({
          target: document.getElementById('scene'),
          minSize: 90
        });
      });
    }, 300);
  }


  _displayConsoleWelcome() {
    console.log('%cHello, you hacky nerd!', 'font-size:16pt');
    console.log(
      `Do you have some piece of code you want to promote or do you need a hand with it ?\nReach %ccontact@messe-basse-production.com%cso we can find a way to help you!`,
      'text-decoration:underline;color:blue'
    );
  }


}


export default MBP;
