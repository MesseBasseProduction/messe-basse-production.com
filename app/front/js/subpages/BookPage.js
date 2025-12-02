import AbstractMBP from '../utils/AbstractMBP.js';
import Utils from '../utils/Utils.js';


class BookPage extends AbstractMBP {


  constructor() {
    super();

    this._init()
      .then(this._initializeBookPage.bind(this))
      .then(this._sharedEvents.bind(this))
      .then(this._makeSceneVisible.bind(this));
  }


  _initializeBookPage() {
    return new Promise((resolve, reject) => {
      this._dom = document.getElementById('scene');
      resolve();
      /*
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
      */
    });
  }


}


export default BookPage;
window.BookPage = new BookPage();
