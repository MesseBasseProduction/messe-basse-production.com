import AbstractMBP from '../utils/AbstractMBP.js';
import Utils from '../utils/Utils.js';


class PhotoPage extends AbstractMBP {


  constructor() {
    super();

    this._photoData = {};

    this._init()
      .then(this._initializePhotoPage.bind(this))
      .then(this._translatePhotoPage.bind(this))
      .then(this._buildPhotoPage.bind(this))
      .then(this._handleEvents.bind(this))
      .then(this._makeSceneVisible.bind(this));
  }


  _initializePhotoPage() {
    return new Promise((resolve, reject) => {
      this._dom = document.getElementById('scene');
      Utils.fetchData('photo').then(data => {
        this._photoData = data;
        resolve();
      }).catch(reject);
    });
  }


  _translatePhotoPage() {
    return new Promise((resolve) => {
      const nav = document.getElementById('navigation');
      Utils.replaceNlsString(nav, 'NAVBAR_CREATION', this._nls.creation.photo);
      Utils.replaceNlsString(this._dom, 'PHOTO_EXPOSITION_TITLE', this._nls.photo.expositionTitle);
      Utils.replaceNlsString(this._dom, 'PHOTO_EXPOSITION_DESCRIPTION', this._nls.photo.expositionDescription);
      Utils.replaceNlsString(this._dom, 'PHOTO_EVENT_TITLE', this._nls.photo.eventTitle);
      Utils.replaceNlsString(this._dom, 'PHOTO_EVENT_DESCRIPTION', this._nls.photo.eventDescription);
      resolve();
    });
  }


  _buildPhotoPage() {
    return new Promise(resolve => {
      // Update image depending on mouse position hovering image wrapper
      const _updateExpoThumb = function(e) {
        const bRect = this.getBoundingClientRect();
        const percentage = ((e.clientX - bRect.x) / bRect.width) * 100;
        for (let i = 0; i < this.children.length; ++i) {
          this.children[i].style.opacity = 0;
        }
        this.children[this.children.length - Math.floor(percentage / 20) - 1].style.opacity = 1;
      };

      for (let i = 0; i < this._photoData.exposition.artist.length; ++i) {
        const expo = document.createElement('DIV');
        expo.classList.add('artist');
        expo.innerHTML = `
          <div id="expo-${i + 1}-img-wrapper" class="img-wrapper">
            <img src="/assets/img/photo/expo/${i + 1}/5_thb.webp" loading="lazy" alt="expo-${i + 1}-5">
            <img src="/assets/img/photo/expo/${i + 1}/4_thb.webp" loading="lazy" alt="expo-${i + 1}-4">
            <img src="/assets/img/photo/expo/${i + 1}/3_thb.webp" loading="lazy" alt="expo-${i + 1}-3">
            <img src="/assets/img/photo/expo/${i + 1}/2_thb.webp" loading="lazy" alt="expo-${i + 1}-2">
            <img src="/assets/img/photo/expo/${i + 1}/1_thb.webp" alt="expo-${i + 1}-1">
          </div>
          <h3><em><a href="${this._photoData.exposition.artist[i].url}" target="_blank" rel="noreferrer noopener">${this._photoData.exposition.artist[i].photographer}</a> – ${this._photoData.exposition.artist[i].title}</em></h3>
        `;
        expo.addEventListener('click', () => {
          this._openPhotoExpositionModal(this._photoData.exposition.prices, this._photoData.exposition.artist[i]);
        });
        this._dom.querySelector('#expo-grid').appendChild(expo);
        expo.firstElementChild.addEventListener('mousemove', _updateExpoThumb);
      }

      for (let i = 0; i < this._photoData.event.length; ++i) {
        const photo = document.createElement('DIV');
        photo.classList.add('photo-element');
        photo.innerHTML = `
          <img src="${this._photoData.event[i].image}" data-url="${this._photoData.event[i].image}" alt="mbp-photo">
          <p>${this._photoData.event[i].name} – © <i><a href="${this._photoData.event[i].url}" target="_blank" rel="noreferrer noopener">${this._photoData.event[i].photographer}</a></i></p>
        `;
        photo.addEventListener('click', () => {
          this._openPhotoModal(this._photoData.event[i]);
        });
        this._dom.querySelector('#photo-grid').appendChild(photo);
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


  _openPhotoExpositionModal(prices, exposition) {
    Utils.fetchPage('/assets/html/modal/expo.html').then(dom => {
      const modal = document.createElement('DIV');
      modal.classList.add('modal');
      modal.classList.add('expo');
      modal.appendChild(dom);

      Utils.replaceNlsString(modal, 'PHOTO_EXPOSITION_MODAL_DESCRIPTION', this._nls.photo.expositionModalDescription);
      Utils.replaceNlsString(modal, 'PHOTO_EXPOSITION_MODAL_CUSTOMIZE', this._nls.photo.expositionModalCustomize);
      Utils.replaceNlsString(modal, 'PHOTO_EXPOSITION_MODAL_PRINT_SIZE', this._nls.photo.expositionModalPrintSize);
      Utils.replaceNlsString(modal, 'PHOTO_EXPOSITION_MODAL_PRINT_TYPE', this._nls.photo.expositionModalPrintType);
      Utils.replaceNlsString(modal, 'PHOTO_EXPOSITION_MODAL_PRINT_PAPER', this._nls.photo.expositionModalPrintPaper);
      Utils.replaceNlsString(modal, 'PHOTO_EXPOSITION_MODAL_PRINT_DIBOND', this._nls.photo.expositionModalPrintDibond);
      Utils.replaceNlsString(modal, 'PHOTO_EXPOSITION_MODAL_FRAME', this._nls.photo.expositionModalFrame);
      Utils.replaceNlsString(modal, 'PHOTO_EXPOSITION_MODAL_FRAME_NONE', this._nls.photo.expositionModalFrameNone);
      Utils.replaceNlsString(modal, 'PHOTO_EXPOSITION_MODAL_FRAME_BLACK', this._nls.photo.expositionModalFrameBlack);
      Utils.replaceNlsString(modal, 'PHOTO_EXPOSITION_MODAL_FRAME_WHITE', this._nls.photo.expositionModalFrameWhite);
      Utils.replaceNlsString(modal, 'PHOTO_EXPOSITION_MODAL_FRAME_WOOD', this._nls.photo.expositionModalFrameWood);
      Utils.replaceNlsString(modal, 'PHOTO_EXPOSITION_MODAL_MARGINS', this._nls.photo.expositionModalMargins);
      Utils.replaceNlsString(modal, 'PHOTO_EXPOSITION_MODAL_POSTAGE_FEES', this._nls.photo.expositionModalPostageFees);
      Utils.replaceNlsString(modal, 'PHOTO_EXPOSITION_MODAL_ORDER', this._nls.photo.expositionModalOrder);

      modal.querySelector('#expo-title').innerHTML = exposition.title;
      modal.querySelector('#expo-author').innerHTML = exposition.photographer;
      modal.querySelector('#selected-photo').src = exposition.photos[0].image;
      modal.querySelector('#photo-title').innerHTML = exposition.photos[0].title;
      modal.querySelector('#photo-date').innerHTML = Utils.formatDate(exposition.photos[0].date, this._lang);

      let index = 0;
      const photoLabels = modal.querySelector('#photo-selector').children;
      for (let i = 0; i < photoLabels.length; ++i) {
        photoLabels[i].innerHTML = exposition.photos[i].title;
        photoLabels[i].addEventListener('click', () => {
          modal.querySelector('#selected-photo').src = exposition.photos[i].image;
          modal.querySelector('#photo-title').innerHTML = exposition.photos[i].title;
          modal.querySelector('#photo-date').innerHTML = Utils.formatDate(exposition.photos[i].date, this._lang);
          photoLabels[index].classList.remove('selected');
          photoLabels[i].classList.add('selected');
          index = i;
        });
      }

      const frameWrapper = modal.querySelector('#frame');
      let size = 'a3';
      let type = 'paper';
      let frame = 'no';
      let price = 0;

      const _updatePrice = () => {
        price = parseInt(prices.photo[type][size]) + parseInt(prices.photo.frame[size][frame]) + parseInt(prices.photo.postal[size]);
        document.getElementById('order-price').innerHTML = `${price}€`;
      };

      const _updateSize = clicked => {
        document.getElementById('frame-size').children[1].classList.remove('selected');
        document.getElementById('frame-size').children[2].classList.remove('selected');
        document.getElementById('frame-size').children[clicked].classList.add('selected');
        size = document.getElementById('frame-size').children[clicked].dataset.size;
        _updatePrice();
      };

      const _updateType = clicked => {
        document.getElementById('print-type').children[1].classList.remove('selected');
        document.getElementById('print-type').children[2].classList.remove('selected');
        document.getElementById('print-type').children[clicked].classList.add('selected');
        type = document.getElementById('print-type').children[clicked].dataset.type;
        _updatePrice();
      };
      
      const _updateFrame = clicked => {
        for (let i = 0; i < frameWrapper.children.length; ++i) {
          frameWrapper.children[i].classList.remove('selected');
        }
        frameWrapper.children[clicked].classList.add('selected');
        frame = frameWrapper.children[clicked].dataset.frame;
        _updatePrice();
      };
      // Size callback
      modal.querySelector('#frame-size').children[1].addEventListener('click', _updateSize.bind(this, 1));
      modal.querySelector('#frame-size').children[2].addEventListener('click', _updateSize.bind(this, 2));
      // Type callback
      modal.querySelector('#print-type').children[1].addEventListener('click', _updateType.bind(this, 1));
      modal.querySelector('#print-type').children[2].addEventListener('click', _updateType.bind(this, 2));
      // Frame callback
      for (let i = 1; i < frameWrapper.children.length; ++i) {
        frameWrapper.children[i].addEventListener('click', _updateFrame.bind(this, i));
      }
      // Margin input callback
      modal.querySelector('#print-margin').addEventListener('change', (e) => {
        if (e.target.checked) {
          modal.querySelector('#selected-photo').style.padding = `${exposition.photos[index].margin / 3}%`;
          modal.querySelector('#selected-photo').style.height = `100%`;
        } else {
          modal.querySelector('#selected-photo').style.padding = 0;
          modal.querySelector('#selected-photo').style.height = '100%';
        }
      });

      modal.querySelector('#place-order').addEventListener('click', () => {
        window.open(`mailto:contact@messe-basse-production.com?subject=Commander un tirage de ${exposition.photographer}&body=Bonjour, je souhaite commander un tirage de ${exposition.photographer}, extrait de son exposition ${exposition.title}. La photo, ${exposition.photos[index].title} (${exposition.photos[index].date}) est à imprimer en ${size}, sur support ${type}. Le choix du cadre est ${frame}, et ${modal.querySelector('#print-margin').checked ? 'avec' : 'sans'} marges.\nCe tirage reviens à ${price}€, frais postaux inclus pour la France. Nos équipes prennent en compte votre demande, et reviennent au plus vite vers vous. Merci de votre confiance!`, '_self');
      });

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


  _openPhotoModal(photo) {
    Utils.fetchPage('/assets/html/modal/photo.html').then(dom => {
      const modal = document.createElement('DIV');
      modal.classList.add('modal');
      modal.classList.add('photo');
      modal.id = 'single-photo-modal';
      modal.appendChild(dom);
      
      const img = modal.getElementsByTagName('IMG')[0];
      img.src = photo.image;
      const text = modal.getElementsByTagName('P')[1]; // First P is close modal
      text.innerHTML = `${photo.name} – © <i><a href="${photo.url}" target="_blank" rel="noreferrer noopener">${photo.photographer}</a></i>`;

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


export default PhotoPage;
window.PhotoPage = new PhotoPage();
