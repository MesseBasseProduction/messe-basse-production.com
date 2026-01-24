import AbstractMBP from '../utils/AbstractMBP.js';
import Utils from '../utils/Utils.js';


class BookPage extends AbstractMBP {


  constructor(options) {
    super();

    this._isReadingPage = false;
    this._collections = [];
    this._dom = document.getElementById('scene');

    if (!options) {
      this._init()
        .then(this._initializeBookPage.bind(this))
        .then(this._translateBookPage.bind(this))
        .then(this._buildBookPage.bind(this))
        .then(this._handleEvents.bind(this))
        .then(this._sharedEvents.bind(this))
        .then(this._makeSceneVisible.bind(this));
    } else {
      this._isReadingPage = true;
      this._init()
        .then(this._translateBookPage.bind(this))
        .then(this._handleEvents.bind(this))
        .then(this._sharedEvents.bind(this))
        .then(this._makeSceneVisible.bind(this));
    }
  }


  _initializeBookPage() {
    return new Promise((resolve, reject) => {
      Utils.fetchData('book').then(data => {
        this._collections = data.collections;
        resolve();
      }).catch(reject);
    });
  }


  _translateBookPage() {
    return new Promise((resolve) => {
      if (this._isReadingPage === true && this._lang === 'en') {
        const notTranslated = document.createElement('P');
        notTranslated.innerHTML = '<b>This book is not yet available in English. It will be displayed here in its native language.</b>';
        this._dom.querySelector('#page-title').parentNode.insertBefore(notTranslated, this._dom.querySelector('#page-title'));
      } else {
        Utils.replaceNlsString(this._dom, 'BOOK_TITLE', this._nls.book.title);
        Utils.replaceNlsString(this._dom, 'BOOK_DESCRIPTION', this._nls.book.description);
      }
      resolve();
    });    
  }


  _buildBookPage() {
    return new Promise(resolve => {
      console.log(this._collections);
      for (let i = 0; i < this._collections.length; ++i) {
        const collection = document.createElement('DIV');
        collection.classList.add('book-collection');

        const collectionTitle = document.createElement('H2');
        collectionTitle.innerHTML = this._collections[i].name;
        collection.appendChild(collectionTitle);
        
        const bookList = document.createElement('DIV');
        bookList.classList.add('collection');
        collection.appendChild(bookList);

        for (let j = 0; j < this._collections[i].books.length; ++j) {
          const book = document.createElement('DIV');
          book.classList.add('item');

          const bookImage = document.createElement('IMG');
          bookImage.src = this._collections[i].books[j].image;
          book.appendChild(bookImage);

          const bookInfo = document.createElement('DIV');
          bookInfo.classList.add('content');
          book.appendChild(bookInfo);

          const bookTitle = document.createElement('H1');
          bookTitle.innerHTML = this._collections[i].books[j].title;
          bookInfo.appendChild(bookTitle);

          const bookSubTitle = document.createElement('H2');
          bookSubTitle.innerHTML = this._collections[i].books[j].subtitle;
          bookInfo.appendChild(bookSubTitle);

          const bookDate = document.createElement('I');
          bookDate.innerHTML = Utils.formatDate(this._collections[i].books[j].date, this._lang);
          bookInfo.appendChild(bookDate);

          const bookSynopsis = document.createElement('P');
          bookSynopsis.innerHTML = this._collections[i].books[j].synopsis[this._lang];
          bookInfo.appendChild(bookSynopsis);

          bookList.appendChild(book);

          book.addEventListener('click', () => {
            this._updateLocation(`${this._collections[i].books[j].catalog}`);
          });
        }
        this._dom.querySelector('#collection-list').appendChild(collection);
      }
      resolve();
    });
  }


  _handleEvents() {
    return new Promise(resolve => {
      this._dom.querySelector('#back-button').addEventListener('click', this._loadPreviousPage.bind(this));
      resolve();
    });
  }


}


export default BookPage;
