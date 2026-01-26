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

      if (this._isReadingPage === true) {
        // Book image containers
        let imgContainers = this._dom.querySelector('.book-content').querySelectorAll('.img-container');
        for (let i = 0; i < imgContainers.length; ++i) {
          imgContainers[i].children[1].addEventListener('click', () => {
            const outputImage = document.createElement('A');
            outputImage.href = `/assets/img/book/MBPPB001/fullres/${imgContainers[i].dataset.file}`;
            outputImage.download = `${imgContainers[i].dataset.name}`;
            outputImage.click();
          });

          imgContainers[i].children[2].addEventListener('click', this._openImgModal.bind(this, {
            image: `/assets/img/book/MBPPB001/fullres/${imgContainers[i].dataset.file}`,
            name: imgContainers[i].dataset.name
          }));
        }

        const carousels = this._dom.querySelector('.book-bonus').querySelectorAll('.img-carousel');
        for (let i = 0; i < carousels.length; ++i) {
          imgContainers = carousels[i].querySelectorAll('.img-container');
          for (let j = 0; j < imgContainers.length; ++j) {
            imgContainers[j].children[1].addEventListener('click', () => {
              const outputImage = document.createElement('A');
              outputImage.href = `/assets/img/book/MBPPB001/fullres/archives/${imgContainers[j].dataset.file}`;
              outputImage.download = `${imgContainers[j].dataset.name}`;
              outputImage.click();
            });

            imgContainers[j].children[2].addEventListener('click', this._openSlideshowModal.bind(this, {
              file: imgContainers[j].dataset.file,
              image: `/assets/img/book/MBPPB001/fullres/archives/${imgContainers[j].dataset.file}`,
              name: imgContainers[j].dataset.name,
              total: carousels[i].dataset.total,
              number: j + 1
            })); 
          }
        }

        new window.ScrollBar({
          target: this._dom.querySelector('#original-carousel'),
          horizontal: true,
          minSize: 200,
          style: {
            color: '#FFBF00'
          }
        });
        new window.ScrollBar({
          target: this._dom.querySelector('#vernier-carousel'),
          horizontal: true,
          minSize: 200,
          style: {
            color: '#FFBF00'
          }
        });
      }
      resolve();
    });
  }


  _openImgModal(photo) {
    Utils.fetchPage('/modal/photo.html').then(dom => {
      const modal = document.createElement('DIV');
      modal.classList.add('modal');
      modal.classList.add('photo');
      modal.id = 'single-photo-modal';
      modal.appendChild(dom);
      
      const img = modal.getElementsByTagName('IMG')[0];
      img.classList.add('in-book');
      img.src = photo.image;
      img.style.boxShadow = '0 0 0 rgba(420, 420, 420, 0)';

      document.getElementById('overlay').appendChild(modal);
      // Modal opening/closing animation
      const closeModal = e => {
        if (['overlay', 'single-photo-modal', 'close-modal'].indexOf(e.target.id) === -1) {
          return;
        }
  
        document.getElementById('overlay').style.opacity = 0;
        setTimeout(() => {
          document.getElementById('overlay').style.display = 'none';
          document.getElementById('overlay').innerHTML = '';
        }, 300);
      };

      modal.removeChild(modal.getElementsByTagName('P')[1]); // First P is close modal
      document.getElementById('overlay').style.display = 'flex';
      setTimeout(() => document.getElementById('overlay').style.opacity = 1, 100);
      setTimeout(() => {
        modal.style.opacity = 1;
        document.getElementById('overlay').addEventListener('click', closeModal);
        document.getElementById('close-modal').addEventListener('click', closeModal);
      }, 200);
    });
  }


  _openSlideshowModal(photo) {
    Utils.fetchPage('/modal/slideshow.html').then(dom => {
      const modal = document.createElement('DIV');
      modal.classList.add('modal');
      modal.classList.add('slideshow');
      modal.id = 'slideshow-modal';
      modal.appendChild(dom);
      const mainImg = modal.getElementsByTagName('IMG')[0];

      // Magnify zoom (thx boss https://www.w3schools.com/howto/howto_js_image_magnifier_glass.asp - here adapted to fit our exact need)
      const glass = mainImg.parentElement.querySelector('.img-magnifier-glass');
      let w = glass.offsetWidth / 2;
      let h = glass.offsetHeight / 2;
      let bw = 3;
      let zoom = 3;
      const moveMagnifier = e => {
        e.preventDefault();
        // Get the x and y positions of the image
        const a = mainImg.getBoundingClientRect();
        // Get the cursor's x and y positions
        // Calculate the cursor's x and y coordinates, relative to the image
        let x = (e.pageX - a.left) - window.pageXOffset;
        let y = (e.pageY - a.top) - window.pageYOffset;
        // Prevent the magnifier glass from being positioned outside the image
        if (x > mainImg.width - (w / zoom)) { x = mainImg.width - (w / zoom); }
        if (x < w / zoom) { x = w / zoom; }
        if (y > mainImg.height - (h / zoom)) { y = mainImg.height - (h / zoom); }
        if (y < h / zoom) { y = h / zoom; }
        // Set the position of the magnifier glass
        glass.style.left = `${(x - w)}px`;
        glass.style.top = `${(y - h)}px`;
        // Display what the magnifier glass "sees"
        glass.style.backgroundPosition = `-${((x * zoom) - w + bw)}px -${((y * zoom) - h + bw)}px`;
      };
      // Execute a function when someone moves the magnifier glass over the image
      glass.addEventListener('mousemove', moveMagnifier);
      mainImg.addEventListener('mousemove', moveMagnifier);
      glass.addEventListener('touchmove', moveMagnifier);
      mainImg.addEventListener('touchmove', moveMagnifier);
      glass.addEventListener('click', () => {
        if (modal.querySelector('.img-magnifier-glass').style.display === 'block') {
          modal.querySelector('.img-magnifier-glass').style.display = 'none';
          modal.getElementsByTagName('IMG')[3].classList.remove('activated');
        } else {
          modal.querySelector('.img-magnifier-glass').style.display = 'block';
          modal.getElementsByTagName('IMG')[3].classList.add('activated');
        }
        setTimeout(() => {
          // Update glass magnifier dimension when made visible
          w = glass.offsetWidth / 2;
          h = glass.offsetHeight / 2;          
        });
      });


      // Next/Previous processing
      let currentIndex = photo.number;
      const updateImage = amount => {
        if (currentIndex + amount > parseInt(photo.total)) {
          currentIndex = 1;
        } else if (currentIndex + amount < 1) {
          currentIndex = parseInt(photo.total);
        } else {
          currentIndex += amount;
        }

        const newFile = photo.file.replace(/(R-\d{3})/, 'R-' + currentIndex.toString().padStart(3, '0'));
        modal.getElementsByTagName('IMG')[0].src =  `/assets/img/book/MBPPB001/fullres/archives/${newFile}`;
        modal.querySelector('#image-title').innerHTML = `${currentIndex} / ${photo.total}`;

        modal.querySelector('#img-loading-spinner').style.display = 'block';
        setTimeout(() => modal.querySelector('#img-loading-spinner').style.opacity = 1);
      };

      // Internal events (previous, download, zoom, next)
      modal.getElementsByTagName('IMG')[1].addEventListener('click', () => updateImage(-1));
      modal.getElementsByTagName('IMG')[2].addEventListener('click', () => {
        const outputImage = document.createElement('A');
        outputImage.href = photo.image;
        outputImage.download = `${photo.name}`;
        outputImage.click();
      });
      modal.getElementsByTagName('IMG')[3].addEventListener('click', () => {
        if (modal.querySelector('.img-magnifier-glass').style.display === 'block') {
          modal.querySelector('.img-magnifier-glass').style.display = 'none';
          modal.getElementsByTagName('IMG')[3].classList.remove('activated');
        } else {
          modal.querySelector('.img-magnifier-glass').style.display = 'block';
          modal.getElementsByTagName('IMG')[3].classList.add('activated');
        }
        setTimeout(() => {
          // Update glass magnifier dimension when made visible
          w = glass.offsetWidth / 2;
          h = glass.offsetHeight / 2;
        });
      });
      modal.getElementsByTagName('IMG')[4].addEventListener('click', () => updateImage(1));

      // Internal onload event to remove loading spinner over image
      mainImg.onload = () => {
        glass.style.backgroundImage = `url('${mainImg.src}')`;
        glass.style.backgroundSize = `${mainImg.width * zoom}px ${mainImg.height * zoom}px`;
        modal.querySelector('#img-loading-spinner').style.opacity = 0;
        setTimeout(() => modal.querySelector('#img-loading-spinner').style.display = 'none', 200);
      };

      // Modal opening/closing animation
      document.getElementById('overlay').appendChild(modal);
      const closeModal = e => {
        if (['overlay', 'slideshow-modal', 'close-modal'].indexOf(e.target.id) === -1 || modal.querySelector('#img-loading-spinner').style.opacity === 1) {
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
        // Only update modal main image when modal is displayed to avoid onLoad fired to soon
        modal.getElementsByTagName('IMG')[0].src = photo.image;
        modal.querySelector('#image-title').innerHTML = `${photo.number} / ${photo.total}`;
      }, 200);
    });
  }


}


export default BookPage;
