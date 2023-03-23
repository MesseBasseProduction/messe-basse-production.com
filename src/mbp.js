import './mbp.scss';
import Data from '../assets/json/data.json';


class MBP {


  constructor() {
    this._lang = (navigator.language.substring(0, 2) === 'fr') ? 'fr' : 'en';
    this._selectedPage = 'home';
    this._selectedSubpage = 'music';
    this._scrollBar = null;
    this._version = '0.1.3';
    this.evts = new window.CustomEvents();
    this._updateNavLang();
    this._displayConsoleWelcome();
    this._hideFlashingLogo()
      .then(this._buildNav.bind(this))
      .then(this._buildHomePage.bind(this));
  }


  _updateNavLang() {
    if (this._lang !== 'fr') {
      document.getElementById('link-home').innerHTML = 'Home';
    }
  }


  _displayConsoleWelcome() {
    console.log('%cHello, you hacky nerd!', 'font-size:16pt');
    console.log(
      `Do you have some piece of code you want to promote or do you need a hand with it ?\nReach %ccontact@messe-basse-production.com%cso we can find a way to help you!`,
      'text-decoration:underline;color:blue'
    );
  }


  _hideFlashingLogo() {
    return new Promise(resolve => {
      // Set a timeout on logo hiding to let the css text animation to perform (zoom in/out)
      setTimeout(() => {
        document.body.removeChild(document.getElementById('flashing-text-logo'));
        resolve();
      }, 6000);
    });
  }


  _buildNav() {
    return new Promise(resolve => {			
      // Launch navigation items animation (descending from top screen)
      document.getElementById('navigation').style.opacity = 1;
      setTimeout(() => document.getElementById('link-home').style.animation = 'drop-nav-link 1.8s forwards', 500);
      setTimeout(() => document.getElementById('link-creation').style.animation = 'drop-nav-link 1.7s forwards', 750);
      setTimeout(() => document.getElementById('link-merch').style.animation = 'drop-nav-link 1.6s forwards', 1000);
      setTimeout(() => document.getElementById('link-contact').style.animation = 'drop-nav-link 1.5s forwards', 1250);
      setTimeout(() => document.getElementById('socials').style.opacity = 1, 2250);
      // Subscribe to click events on navigation bar
      document.getElementById('link-home').addEventListener('click', this._buildHomePage.bind(this));
      document.getElementById('link-creation').addEventListener('click', this._buildCreationPage.bind(this));
      document.getElementById('link-merch').addEventListener('click', this._buildMerchPage.bind(this));
      document.getElementById('link-contact').addEventListener('click', this._buildContactPage.bind(this));
      // Resolve (fetch homepage template) after animation is performed
      setTimeout(resolve, 1500);
    });
  }


  /* Pages */


  _buildPage(name) {
    return new Promise(resolve => {
      this._fetchPage(`assets/html/${this._lang}/${name}.html`, name).then(resolve);
    });
  }


  _buildHomePage() {
    return this._buildPage('home');
  }


  _buildCreationPage() {
    return new Promise (resolve => {
      this._buildPage('creation').then(() => {
        this.evts.addEvent('click', document.getElementById('music-subpage'), this._buildMusicSubpage, this);
        this.evts.addEvent('click', document.getElementById('video-subpage'), this._buildVideoSubpage, this);
        this.evts.addEvent('click', document.getElementById('photo-subpage'), this._buildPhotoSubpage, this);
        //this.evts.addEvent('click', document.getElementById('book-subpage'), this._buildBookSubpage, this);
        this.evts.addEvent('click', document.getElementById('software-subpage'), this._buildSoftwareSubpage, this);
        resolve();
      });
    });
  }


  _buildMerchPage() {
    const order = e => {
      if (this._lang === 'fr') {
        window.open(`mailto:contact@messe-basse-production.com?subject=Commander un album de ${e.target.dataset.title}&body=<i>Dites-nous si vous voulez la version standard ou la version signée. Nous reviendrons vers vous au plus vite pour les formalités d'envoi. À fort vite!</i>`, '_blank');
      } else {
        window.open(`mailto:contact@messe-basse-production.com?subject=Order an album of ${e.target.dataset.title}&body=<i>Please tell us if you want to take the regular or the signed release. We'll get in touch with you as soon as possible for postal formalities. Bye bye handsome!</i>`, '_blank');
      }
    };

    return new Promise(resolve => {
      this._buildPage('merch').then(() => {
        this.evts.addEvent('click', document.getElementById('order-dystopie'), order.bind(this), this);
        this.evts.addEvent('click', document.getElementById('order-etica'), order.bind(this), this);
        resolve();
      });
    });
  }


  _buildContactPage() {
    return new Promise((resolve) => {
      this._buildPage('contact').then(() => {
        this.evts.addEvent('click', document.getElementById('credit-modal'), this._buildCreditModal, this);
        resolve();
      });
    });
  }


  /* Subpages */


  _buildSubpage(e, name) {
    for (let i = 0; i < document.getElementById('subpage-nav').children.length; ++i) {
      document.getElementById('subpage-nav').children[i].classList.remove('selected');
    }
    e.target.classList.add('selected');
    this._selectedSubpage = name;
    return new Promise(resolve => {
      this._fetchPage(`assets/html/${this._lang}/subpage/${name}.html`, 'subpage', 'subpage').then(resolve);
    });	
  }


  _buildMusicSubpage(e) {
    this._buildSubpage(e, 'music').then(() => {
      const bands = document.getElementsByClassName('band-image');
      for (let i = 0; i < bands.length; ++i) {
        bands[i].addEventListener('click', () => {
          window.open(bands[i].dataset.url, '_blank', 'noopener, noreferrer');
        });
      }
    });
  }


  _buildVideoSubpage(e) {
    return this._buildSubpage(e, 'video');
  }

  
  _buildPhotoSubpage(e) {
    this._buildSubpage(e, 'photo').then(() => {
      // Update expo thumbnail on mouse position (converted in width %)
      const _updateExpoThumb = function(e) {
        const bRect = this.getBoundingClientRect();
        const percentage = ((e.clientX - bRect.x) / bRect.width) * 100;
        for (let i = 0; i < this.children.length; ++i) {
          this.children[i].style.opacity = 0;
        }
        this.children[this.children.length - Math.floor(percentage / 20) - 1].style.opacity = 1;
      };
      // Expo click listeners
      const imgWrapper1 = document.getElementById('expo-1-img-wrapper');
      imgWrapper1.addEventListener('mousemove', _updateExpoThumb);
      document.getElementById('expo-1').addEventListener('click', this._buildExpoModal.bind(this, 1));
      //const imgWrapper2 = document.getElementById('expo-2-img-wrapper');
      //imgWrapper2.addEventListener('mousemove', _updateExpoThumb);
      //document.getElementById('expo-2').addEventListener('click', this._buildExpoModal.bind(this, 2));
      // Click listener on classical photos
      const imgs = document.getElementById('photo-grid').getElementsByTagName('IMG');
      for (let i = 0; i < imgs.length; ++i) {
        imgs[i].addEventListener('click', () => {
          // Send image name.extension and nextSibling is image label
          this._buildPhotoModal(imgs[i].dataset.url, imgs[i].nextElementSibling.innerHTML);
        });
      }
    });
  }


  _buildBookSubpage(e) {
    return this._buildSubpage(e, 'book');
  }


  _buildSoftwareSubpage(e) {
    this._buildSubpage(e, 'software').then(() => {
      const divs = document.getElementById('band-website-grid').children;
      for (let i = 0; i < divs.length; ++i) {
        divs[i].addEventListener('click', () => {
          window.open(divs[i].dataset.url, '_blank', 'noopener, noreferrer');
        });
      }
    });     
  }


  /* Modals */


  _buildExpoModal(expoNumber) {
    this._fetchModal(`assets/html/${this._lang}/modal/expo.html`).then(() => {
      const expoData = Data.expo[expoNumber - 1];
      const selector = document.getElementById('photo-selector');
      const frameWrapper = document.getElementById('frame');
      let selectedIndex = 0;
      let size = 'a3';
      let type = 'paper';
      let frame = 'no';
      let price = 0;

      document.getElementById('expo-title').innerHTML = expoData.title;
      document.getElementById('expo-author').innerHTML = expoData.author;

      const _updatePrice = () => {
        price = parseInt(Data.prices.photo[type][size]) + parseInt(Data.prices.photo.frame[size][frame]) + parseInt(Data.prices.photo.postal[size]);
        document.getElementById('order-price').innerHTML = `${price}€`;
      };

      const _updateSelectedPhoto = function() {
        for (let i = 0; i < selector.children.length; ++i) {
          selector.children[i].classList.remove('selected');
        }
  
        selectedIndex = parseInt(this.dataset.number);
        document.getElementById('selected-photo').src = `assets/img/photo/expo/${expoNumber}/${selectedIndex + 1}.webp`;
        document.getElementById('photo-title').innerHTML = expoData.photos[selectedIndex].title;
        document.getElementById('photo-date').innerHTML = expoData.photos[selectedIndex].date;
        this.classList.add('selected');
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
      // Listener on photo select
      for (let i = 0; i < selector.children.length; ++i) {
        selector.children[i].innerHTML = expoData.photos[i].title;
        selector.children[i].addEventListener('click', _updateSelectedPhoto);
      }
      // Init editor with first expo photo
      document.getElementById('selected-photo').src = `assets/img/photo/expo/${expoNumber}/1.webp`;
      document.getElementById('photo-title').innerHTML = expoData.photos[0].title;
      document.getElementById('photo-date').innerHTML = expoData.photos[0].date;
      // Size callback
      document.getElementById('frame-size').children[1].addEventListener('click', _updateSize.bind(this, 1));
      document.getElementById('frame-size').children[2].addEventListener('click', _updateSize.bind(this, 2));
      // Type callback
      document.getElementById('print-type').children[1].addEventListener('click', _updateType.bind(this, 1));
      document.getElementById('print-type').children[2].addEventListener('click', _updateType.bind(this, 2));
      // Frame callback
      for (let i = 1; i < frameWrapper.children.length; ++i) {
        frameWrapper.children[i].addEventListener('click', _updateFrame.bind(this, i));
      }      
      // Margin input callback
      document.getElementById('print-margin').addEventListener('change', (e) => {
        if (e.target.checked) {
          document.getElementById('selected-photo').style.padding = `${expoData.photos[selectedIndex].margin / 3}%`;
          document.getElementById('selected-photo').style.height = `100%`;
        } else {
          document.getElementById('selected-photo').style.padding = 0;
          document.getElementById('selected-photo').style.height = '100%';
        }
      });
      document.getElementById('place-order').addEventListener('click', (e) => {
        if (this._lang === 'fr') {
          window.open(`mailto:contact@messe-basse-production.com?subject=Commander un tirage de ${expoData.author}&body=Bonjour, je souhaite commander un tirage de ${expoData.author}, extrait de son exposition ${expoData.title}. La photo, ${expoData.photos[selectedIndex].title} (${expoData.photos[selectedIndex].date}) est à imprimer en ${size}, sur support ${type}. Le choix du cadre est ${frame}, et ${document.getElementById('print-margin').checked ? 'avec' : 'sans'} marges.\nCe tirage reviens à ${price}€, frais postaux inclus pour la France. Nos équipes prennent en compte votre demande, et reviennent au plus vite vers vous. Merci de votre confiance!`, '_self');
        } else {
          window.open(`mailto:contact@messe-basse-production.com?subject=Order an album of ${e.target.dataset.title}&body=<i>Please tell us if you want to take the regular or the signed release. We'll get in touch with you as soon as possible for postal formalities. Bye bye handsome!</i>`, '_blank');
        }
      });
      // Update prices
      _updatePrice();
    });
  }


  _buildPhotoModal(url, label) {
    return new Promise(resolve => {
      this._fetchModal(`assets/html/${this._lang}/modal/photo.html`).then(() => {
        const img = document.getElementById('modal').getElementsByTagName('IMG')[0];
        img.src = `/assets/img/photo/${url}`;
        const text = document.getElementById('modal').getElementsByTagName('P')[1]; // First P is close modal
        text.innerHTML = label;
        resolve();
      });
    });		
  }


  _buildCreditModal() {
    return new Promise(resolve => {
      this._fetchModal(`assets/html/${this._lang}/modal/credit.html`).then(() => {
        resolve();
      });
    });
  }


  /* Utils */


  _fetchPage(url, className, target) {
    return new Promise((resolve, reject) => {
      if (!target) {
        target = 'scene';
        // Delete events and update nav bar only if not a subpage is fetched 
        this.evts.removeAllEvents();
        document.getElementById(`link-${this._selectedPage}`).classList.remove('selected');
        this._selectedPage = className;
        document.getElementById(`link-${this._selectedPage}`).classList.add('selected');
      }

      document.getElementById(target).style.opacity = 0;
      setTimeout(() => {
        fetch(url).then(data => {
          data.text().then(htmlString => {
            document.getElementById(target).classList.remove('selected');
            document.getElementById(target).className = className;
            document.getElementById(target).innerHTML = '';
            document.getElementById(target).appendChild(document.createRange().createContextualFragment(htmlString));
            document.getElementById(target).style.opacity = 1;
            // Save scene scrollbar only if not a subpage being built
            if (className !== 'subpage') {
              this._scrollBar = new window.ScrollBar({
                target: document.getElementById(target)
              });
            }
            setTimeout(resolve, 600);
          }).catch(reject);
        }).catch(reject);
      }, 600);
    });
  }


  _fetchModal(url) {
    return new Promise((resolve, reject) => {
      const evtIds = [];
      // Close modal inner method
      const closeModal = e => {
        if (['overlay', 'close-modal'].indexOf(e.target.id) === -1) {
          return;
        }

        document.getElementById('overlay').style.opacity = 0;				
        setTimeout(() => {
          document.getElementById('overlay').style.display = 'none';
          document.getElementById('overlay').innerHTML = '';
          for (let i = 0; i < evtIds.length; ++i) {
            this.evts.removeEvent(evtIds[i]);
          }
        }, 600);
      };
      // Display modal when needed
      const displayModal = () => {
        document.getElementById('modal').style.opacity = 1;
        evtIds.push(this.evts.addEvent('click', document.getElementById('overlay'), closeModal, this));
        evtIds.push(this.evts.addEvent('click', document.getElementById('close-modal'), closeModal, this));
      };

      document.getElementById('overlay').style.display = 'flex';
      setTimeout(() => {
        document.getElementById('overlay').style.opacity = 1;
        setTimeout(() => {
          fetch(url)
            .then(data => {
              data.text().then(htmlString => {
                document.getElementById('overlay').appendChild(document.createRange().createContextualFragment(htmlString));
                resolve();
                setTimeout(displayModal.bind(this), 50);
            })
            .catch(reject);
          })
          .catch(reject);
        }, 50);
      }, 50);
    });
  }


}


export default MBP;
