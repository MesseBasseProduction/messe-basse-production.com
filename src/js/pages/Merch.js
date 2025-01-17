import Utils from '../utils/Utils.js';


class Merch {


  constructor(options) {
    this._lang = options.lang;
    this._nls = options.nls;
    this._dom = null;

    Utils.fetchPage('/assets/html/merch.html')
      .then(this._initDOM.bind(this))
      .then(this._translatePage.bind(this))
      .then(Utils.fetchData.bind(this, 'merch'))
      .then(this._buildDOM.bind(this))
      .catch(err => console.error(err));
  }


  _initDOM(dom) {
    return new Promise(resolve => {
      this._dom = document.createElement('SECTION');
      this._dom.appendChild(dom);
      resolve();
    });
  }


  _translatePage() {
    return new Promise(resolve => {
      Utils.replaceString(this._dom, '{{MERCH_APPAREL}}', this._nls.apparel);
      Utils.replaceString(this._dom, '{{MERCH_MUSIC}}', this._nls.music);
      resolve();
    });
  }


  _buildDOM(data) {
    return new Promise(resolve => {
      const albums = this._dom.querySelector('#musical-merch');
      for (let i = 0; i < data.albums.length; ++i) {
        const album = this.__buildMusicalMerch(data.albums[i]);
        albums.appendChild(album);
      }

      const apparel = this._dom.querySelector('#apparel-merch');
      for (let i = 0; i < data.apparel.length; ++i) {
        const collection = this.__buildApparelMerch(data.apparel[i]);
        apparel.appendChild(collection);
      }

      resolve();
    });
  }


  __buildApparelMerch(data) {
    const collection = document.createElement('DIV');
    collection.classList.add('merch-item');

    const image = document.createElement('IMG');
    image.src = data.image;

    const name = document.createElement('H2');
    name.innerHTML = data.name;

    const designed = document.createElement('P');
    designed.innerHTML = `${this._nls.by} <b>${data.designer}</b>`;

    const price = document.createElement('P');
    price.innerHTML = `${data.type} : ${data.price}*`;

    const postageFee = document.createElement('I');
    postageFee.innerHTML = this._nls.postageFee;

    const submit = document.createElement('BUTTON');
    submit.innerHTML = this._nls.orderOne;

    if (data.remaining === 0) {
      const soldOut = document.createElement('P');
      soldOut.classList.add('sold-out');
      soldOut.innerHTML = this._nls.soldOut;
      collection.appendChild(soldOut);
      submit.setAttribute('disabled', 'disabled');
    } else {
      const remaining = document.createElement('P');
      remaining.classList.add('remaining');
      remaining.innerHTML = `${data.remaining} ${this._nls.remaining}`;
      collection.appendChild(remaining);

      submit.addEventListener('click', () => {
        window.open(`mailto:contact@messe-basse-production.com?subject=Commander le vêtement ${data.name}&body=Bonjour, je souhaite commander le vêtement ${data.name} de ${data.designer}. Ce vêtement reviens à ${data.price}, frais postaux non inclus pour la France. Nos équipes prennent en compte votre demande, et reviennent au plus vite vers vous. Merci de votre confiance!`, '_self');
      });
    }

    collection.appendChild(image);
    collection.appendChild(name);
    collection.appendChild(designed);
    collection.appendChild(price);
    collection.appendChild(postageFee);
    collection.appendChild(submit);

    return collection;
  }


  __buildMusicalMerch(data) {
    const album = document.createElement('DIV');
    album.classList.add('merch-item');

    const image = document.createElement('IMG');
    image.src = data.image;

    const name = document.createElement('H2');
    name.innerHTML = data.name;

    const regularPrice = document.createElement('P');
    regularPrice.innerHTML = `${this._nls.regularAlbum} : <b>${data.price.regular}*</b>`;

    const signedPrice = document.createElement('P');
    signedPrice.innerHTML = `${this._nls.signedAlbum} : <b>${data.price.signed}*</b>`;

    const postageFee = document.createElement('I');
    postageFee.innerHTML = this._nls.postageFee;

    const submit = document.createElement('BUTTON');
    submit.innerHTML = this._nls.orderOne;

    if (data.remaining === 0) {
      const soldOut = document.createElement('P');
      soldOut.classList.add('sold-out');
      soldOut.innerHTML = this._nls.soldOut;
      album.appendChild(soldOut);
      submit.setAttribute('disabled', 'disabled');
    } else {
      const remaining = document.createElement('P');
      remaining.classList.add('remaining');
      remaining.innerHTML = `${data.remaining} ${this._nls.remaining}`;
      album.appendChild(remaining);

      submit.addEventListener('click', () => {
        window.open(`mailto:contact@messe-basse-production.com?subject=Commander le disque ${data.name}&body=Bonjour, je souhaite commander le disque ${data.name}. Nos équipes prennent en compte votre demande, et reviennent au plus vite vers vous. Merci de votre confiance!`, '_self');
      });
    }

    album.appendChild(image);
    album.appendChild(name);
    album.appendChild(regularPrice);
    album.appendChild(signedPrice);
    album.appendChild(postageFee);
    album.appendChild(submit);

    return album;
  }


  get dom() {
    return this._dom;
  }


}

export default Merch;
