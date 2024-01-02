import Utils from '../utils/Utils.js';


class Creation {


  constructor(options) {
    this._lang = options.lang;
    this._nls = options.nls;
    this._dom = null;
    this._subpages = {};

    this._scrolls = {
      music: []
    };

    this._currentPage = 'music';

    Utils.fetchPage('/assets/html/creation.html')
      .then(this._initDOM.bind(this))
      .then(this._fetchSubpages.bind(this))
      .then(this._translateSubpages.bind(this))
      .then(Utils.fetchData.bind(this, 'creation'))
      .then(this._buildDOM.bind(this))
      .then(this._events.bind(this))
      .then(this._switchView.bind(this, 'music'))
      .catch(err => console.error(err));
  }


  _initDOM(dom) {
    return new Promise(resolve => {
      this._dom = document.createElement('DIV');
      this._dom.appendChild(dom);
      resolve();
    });
  }


  _fetchSubpages() {
    return new Promise(resolve => {
      const promises = [];
      const subpages = ['music', 'video', 'photo', 'software'];
      for (let i = 0; i < subpages.length; ++i) {
        promises.push(new Promise(pageLoaded => {
          Utils.fetchPage(`/assets/html/creation/${subpages[i]}.html`)
            .then(fragment => {
              const dom = document.createElement('DIV');
              dom.classList.add(subpages[i]);
              dom.appendChild(fragment);
              this._subpages[subpages[i]] = dom;
              pageLoaded();
            });
        }));
      }
      Promise.all(promises).then(resolve);
    });
  }


  _translateSubpages() {
    return new Promise(resolve => {
      Utils.replaceString(this._subpages.music, '{{MUSIC_TITLE}}', this._nls.music.title);
      Utils.replaceString(this._subpages.music, '{{MUSIC_DESCRIPTION}}', this._nls.music.description);
      Utils.replaceString(this._subpages.video, '{{VIDEO_TITLE}}', this._nls.video.title);
      Utils.replaceString(this._subpages.video, '{{VIDEO_DESCRIPTION}}', this._nls.video.description);
      Utils.replaceString(this._subpages.photo, '{{PHOTO_EXPOSITION_TITLE}}', this._nls.photo.expositionTitle);
      Utils.replaceString(this._subpages.photo, '{{PHOTO_EXPOSITION_DESCRIPTION}}', this._nls.photo.expositionDescription);
      Utils.replaceString(this._subpages.photo, '{{PHOTO_EVENT_TITLE}}', this._nls.photo.eventTitle);
      Utils.replaceString(this._subpages.photo, '{{PHOTO_EVENT_DESCRIPTION}}', this._nls.photo.eventDescription);
      Utils.replaceString(this._subpages.software, '{{SOFTWARE_TITLE}}', this._nls.software.title);
      Utils.replaceString(this._subpages.software, '{{SOFTWARE_DESCRIPTION1}}', this._nls.software.description1);
      Utils.replaceString(this._subpages.software, '{{SOFTWARE_DESCRIPTION2}}', this._nls.software.description2);
      Utils.replaceString(this._subpages.software, '{{SOFTWARE_CREATION}}', this._nls.software.creation);
      Utils.replaceString(this._subpages.software, '{{SOFTWARE_ARTISTS_WEBSITE}}', this._nls.software.artistsWebsite);
      resolve();
    });
  }


  /* Subpages DOM building */


  _buildDOM(data) {
    return new Promise(resolve => {
      this.__buildMusicDOM(data.music)
        .then(this.__buildVideoDOM.bind(this, data.video))
        .then(this.__buildPhotoDOM.bind(this, data.photo))
        .then(this.__buildSoftwareDOM.bind(this, data.software))
        .then(resolve);
    });
  }


  __buildMusicDOM(data) {
    return new Promise(resolve => {
      for (let i = 0; i < data.artists.length; ++i) {
        const band = document.createElement('DIV');
        band.classList.add('band');

        const bandImage = document.createElement('DIV');
        band.appendChild(bandImage);
        bandImage.outerHTML = `
          <div class="band-image" data-url="${data.artists[i].mainLink}">
            <img src="${data.artists[i].image}" alt="band-image">
          </div>
        `;
        bandImage.outerHTML.replace('\n', '');
        band.firstElementChild.addEventListener('click', () => {
          window.open(band.firstElementChild.dataset.url, '_blank', 'noopener, noreferrer');
        });

        const bandReleasesWrapper = document.createElement('DIV');
        band.appendChild(bandReleasesWrapper);
        bandReleasesWrapper.classList.add('band-releases');

        const bandHeader = document.createElement('DIV');
        bandReleasesWrapper.appendChild(bandHeader);

        let genres = '';
        for (let j = 0; j < data.artists[i].genres.length; ++j) {
          genres += `<span>${data.artists[i].genres[j]}</span>`;
        }
        // Update header with band genres
        bandHeader.outerHTML = `
          <div class="band-header">
            <h2><a href="${data.artists[i].mainLink}" target="_blank" rel="noreferrer noopener" alt="band-tree">${data.artists[i].name}</a></h2>
            <p>${genres}</p>
          </div>
        `;
        bandHeader.outerHTML.replace('\n', '');

        const bandReleases = document.createElement('DIV');
        bandReleases.classList.add('band-albums');
        bandReleasesWrapper.appendChild(bandReleases);
        // Iterate over artist's releases
        for (let j = 0; j < data.artists[i].releases.length; ++j) {
          const release = data.releases[data.artists[i].releases[j]];
          const album = document.createElement('DIV');
          bandReleases.appendChild(album);
          album.outerHTML = `
            <div class="album">
              <img src="${release.image}" alt="release-cover">
              <p>${release.name}</p>
              <div class="album-overlay">
                <p><b>${data.artists[i].releases[j]}</b></p>
                <p>${Utils.formatDate(release.date, this._lang)}</p>
                <a href="${release.mainLink}" target="_blank" rel="noreferrer noopener">${this._nls.music.listenOnline}</a>
              </div>
            </div>
          `;
          album.outerHTML.replace('\n', '');
        }

        this._scrolls.music.push(new window.ScrollBar({
          target: bandReleases,
          horizontal: true
        }));

        this._subpages.music.firstElementChild.appendChild(band);
      }
      resolve();
    });
  }


  __buildVideoDOM(data) {
    return new Promise(resolve => {
      for (let i = 0; i < data.length; ++i) {
        const video = document.createElement('DIV');
        video.classList.add('embed-video');
        video.innerHTML = `
          <iframe src="${data[i].url}" title="${data[i].artist} – ${data[i].name}" allowfullscreen="" sandbox="allow-same-origin allow-scripts allow-popups" frameborder="0"></iframe>
          <h2>${data[i].artist} – ${data[i].name}, ${Utils.formatDate(data[i].date, this._lang)}</h2>
        `;
        video.innerHTML.replace('\n', '');
        this._subpages.video.querySelector('#video-grid').appendChild(video);
      }
      resolve();
    });
  }


  __buildPhotoDOM(data) {
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

      for (let i = 0; i < data.exposition.artist.length; ++i) {
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
          <h3><em><a href="${data.exposition.artist[i].url}" target="_blank" rel="noreferrer noopener">${data.exposition.artist[i].photographer}</a> – ${data.exposition.artist[i].title}</em></h3>
        `;
        expo.addEventListener('click', () => {
          this._openPhotoExpositionModal(data.exposition.prices, data.exposition.artist[i]);
        });
        this._subpages.photo.querySelector('#expo-grid').appendChild(expo);
        expo.firstElementChild.addEventListener('mousemove', _updateExpoThumb);
      }

      for (let i = 0; i < data.event.length; ++i) {
        const photo = document.createElement('DIV');
        photo.classList.add('photo-element');
        photo.innerHTML = `
          <img src="${data.event[i].image}" data-url="${data.event[i].image}" alt="mbp-photo">
          <p>${data.event[i].name} – © <i><a href="${data.event[i].url}" target="_blank" rel="noreferrer noopener">${data.event[i].photographer}</a></i></p>
        `;
        photo.addEventListener('click', () => {
          this._openPhotoModal(data.event[i]);
        });
        this._subpages.photo.querySelector('#photo-grid').appendChild(photo);
      }

      resolve();
    });
  }


  __buildSoftwareDOM(data) {
    return new Promise(resolve => {
      for (let i = 0; i < data.creation.length; ++i) {
        const website = document.createElement('DIV');
        website.classList.add('website');
        website.dataset.url = data.creation[i].url;
        website.innerHTML = `
          <img src="${data.creation[i].image}" alt="mbp-website">
          <h2>${data.creation[i].name}</h2>
          <p>${data.creation[i].bio[this._lang]}</p>
        `;
        website.addEventListener('click', () => {
          window.open(website.dataset.url, '_blank', 'noopener, noreferrer');
        });
        this._subpages.software.querySelector('#mbp-website-grid').appendChild(website);
      }

      for (let i = 0; i < data.artists.length; ++i) {
        const website = document.createElement('DIV');
        website.classList.add('website');
        website.dataset.url = data.artists[i].url;
        website.innerHTML = `
          <img src="${data.artists[i].image}" alt="mbp-website">
          <h2>${data.artists[i].name}</h2>
        `;
        website.addEventListener('click', () => {
          window.open(website.dataset.url, '_blank', 'noopener, noreferrer');
        });
        this._subpages.software.querySelector('#band-website-grid').appendChild(website);
      }

      resolve();
    }); 
  }


  _events() {
    this._dom.querySelector('#music-subpage').addEventListener('click', this._switchView.bind(this, 'music'));
    this._dom.querySelector('#video-subpage').addEventListener('click', this._switchView.bind(this, 'video'));
    this._dom.querySelector('#photo-subpage').addEventListener('click', this._switchView.bind(this, 'photo'));
    this._dom.querySelector('#software-subpage').addEventListener('click', this._switchView.bind(this, 'software'));
  }


  /* Modal events */


  _openPhotoExpositionModal(prices, exposition) {
    Utils.fetchPage('/assets/html/modal/expo.html').then(dom => {
      const modal = document.createElement('DIV');
      modal.classList.add('modal');
      modal.classList.add('expo');
      modal.appendChild(dom);

      Utils.replaceString(modal, '{{PHOTO_EXPOSITION_MODAL_DESCRIPTION}}', this._nls.photo.expositionModalDescription);
      Utils.replaceString(modal, '{{PHOTO_EXPOSITION_MODAL_CUSTOMIZE}}', this._nls.photo.expositionModalCustomize);
      Utils.replaceString(modal, '{{PHOTO_EXPOSITION_MODAL_PRINT_SIZE}}', this._nls.photo.expositionModalPrintSize);
      Utils.replaceString(modal, '{{PHOTO_EXPOSITION_MODAL_PRINT_TYPE}}', this._nls.photo.expositionModalPrintType);
      Utils.replaceString(modal, '{{PHOTO_EXPOSITION_MODAL_PRINT_PAPER}}', this._nls.photo.expositionModalPrintPaper);
      Utils.replaceString(modal, '{{PHOTO_EXPOSITION_MODAL_PRINT_DIBOND}}', this._nls.photo.expositionModalPrintDibond);
      Utils.replaceString(modal, '{{PHOTO_EXPOSITION_MODAL_FRAME}}', this._nls.photo.expositionModalFrame);
      Utils.replaceString(modal, '{{PHOTO_EXPOSITION_MODAL_FRAME_NONE}}', this._nls.photo.expositionModalFrameNone);
      Utils.replaceString(modal, '{{PHOTO_EXPOSITION_MODAL_FRAME_BLACK}}', this._nls.photo.expositionModalFrameBlack);
      Utils.replaceString(modal, '{{PHOTO_EXPOSITION_MODAL_FRAME_WHITE}}', this._nls.photo.expositionModalFrameWhite);
      Utils.replaceString(modal, '{{PHOTO_EXPOSITION_MODAL_FRAME_WOOD}}', this._nls.photo.expositionModalFrameWood);
      Utils.replaceString(modal, '{{PHOTO_EXPOSITION_MODAL_MARGINS}}', this._nls.photo.expositionModalMargins);
      Utils.replaceString(modal, '{{PHOTO_EXPOSITION_MODAL_POSTAGE_FEES}}', this._nls.photo.expositionModalPostageFees);
      Utils.replaceString(modal, '{{PHOTO_EXPOSITION_MODAL_ORDER}}', this._nls.photo.expositionModalOrder);

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


  /* View navigation */


  _switchView(target) {
    // Start hide animation
    this._dom.querySelector('#subpage').style.opacity = 0;
    // Update nav selected item
    this._dom.querySelector(`#${this._currentPage}-subpage`).classList.remove('selected');
    this._dom.querySelector(`#${target}-subpage`).classList.add('selected');
    // Get DOM from pages
    let dom = null;
    switch (target) {
      case 'music':
        dom = this._subpages.music;
        break;
      case 'video':
        dom = this._subpages.video;
        break;
      case 'photo':
        dom = this._subpages.photo;
        break;
      case 'software':
        dom = this._subpages.software;
        break;
      default:
        dom = this._homePage.music;
        break;
    }
    // After opacity animation done, perform view switch
    setTimeout(() => {
      this._dom.querySelector('#subpage').classList.remove(this._currentPage);
      this._dom.querySelector('#subpage').classList.add(target);
      this._currentPage = target; // Updated stored current page
      this._dom.querySelector('#subpage').innerHTML = '';
      this._dom.querySelector('#subpage').appendChild(dom);
      requestAnimationFrame(() => {
        this._dom.querySelector('#subpage').style.opacity = 1;
        this._updateScrolls();
        // this._scroll = new window.ScrollBar({
        //   target: document.getElementById('subpage'),
        //   minSize: 90
        // });
      });
    }, 300);
  }


  _updateScrolls() {
    // Ensure scrollbar do appear after switching view
    setTimeout(() => {
      for (let i = 0; i < this._scrolls.music.length; ++i) {
        this._scrolls.music[i].updateScrollbar();
      }
    }, 500);
  }


  get dom() {
    this._updateScrolls();
    return this._dom;
  }


}

export default Creation;
