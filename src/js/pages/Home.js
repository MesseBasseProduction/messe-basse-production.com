import Utils from '../utils/Utils';


class Home {


  constructor(options) {
    this._lang = options.lang;
    this._nls = options.nls;
    this._dom = null;
    // HomePage init is special, as it's the firstview displayed
    // So its init consists of, copy content from HTML
    // Store and translate it, then append it to scene again.
    this._initDOM()
      .then(this._translatePage.bind(this))
      .then(this._appendPage.bind(this));
  }


  _initDOM() {
    return new Promise(resolve => {
      // Home can be retrieved straight from HTML, then stored to be restored each time home is called
      this._dom = document.getElementById('scene').firstElementChild.cloneNode(true);
      document.getElementById('scene').innerHTML = '';
      requestAnimationFrame(resolve);
    });
  }


  _translatePage() {
    return new Promise(resolve => {
      Utils.replaceString(this._dom, '{{HOMEPAGE_MANTRA}}', this._nls.mantra);
      Utils.replaceString(this._dom, '{{HOMEPAGE_DESCRIPTION}}', this._nls.description);
      requestAnimationFrame(resolve);
    });
  }


  _appendPage() {
    document.getElementById('scene').appendChild(this._dom);
    document.getElementById('scene').classList.add('home');
  }


  get dom() {
    return this._dom;
  }


}

export default Home;
