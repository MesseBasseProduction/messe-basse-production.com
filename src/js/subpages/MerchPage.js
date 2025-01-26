import AbstractMBP from '../utils/AbstractMBP.js';
import Utils from '../utils/Utils.js';


class MerchPage extends AbstractMBP {


  constructor() {
    super();

    this._merchData = {};

    this._init()
      .then(this._initializeMerchPage.bind(this))
      .then(this._translateMerchPage.bind(this))
      .then(this._buildMerchPage.bind(this))
      .then(this._handleEvents.bind(this))
      .then(this._makeSceneVisible.bind(this));
  }


  _initializeMerchPage() {
    return new Promise((resolve, reject) => {
      this._dom = document.getElementById('scene');
      Utils.fetchData('merch').then(data => {
        this._merchData = data;
        resolve();
      }).catch(reject);
    });
  }


  _translateMerchPage() {
    return new Promise((resolve) => {
      const nav = document.getElementById('navigation');
      Utils.replaceNlsString(nav, 'NAVBAR_CREATION', this._nls.creation.merch);
      Utils.replaceNlsString(this._dom, 'MERCH_MUSIC', this._nls.merch.music);
      Utils.replaceNlsString(this._dom, 'MERCH_APPAREL', this._nls.merch.apparel);
      resolve();
    });
  }


  _buildMerchPage() {
    return new Promise(resolve => {
      const albums = this._dom.querySelector('#musical-merch');
      for (let i = 0; i < this._merchData.albums.length; ++i) {
        const album = this.__buildMusicalMerch(this._merchData.albums[i]);
        albums.appendChild(album);
      }
    
      const apparel = this._dom.querySelector('#apparel-merch');
      for (let i = 0; i < this._merchData.apparel.length; ++i) {
        const collection = this.__buildApparelMerch(this._merchData.apparel[i]);
        apparel.appendChild(collection);
      }

      resolve();
    });
  }


  __buildMusicalMerch(data) {
    const album = document.createElement('DIV');
    album.classList.add('merch-item');

    const image = document.createElement('IMG');
    image.src = data.image;

    const name = document.createElement('H2');
    name.innerHTML = data.name;

    const regularPrice = document.createElement('P');
    regularPrice.innerHTML = `${this._nls.merch.regularAlbum} : <b>${data.price.regular}*</b>`;

    const signedPrice = document.createElement('P');
    signedPrice.innerHTML = `${this._nls.merch.signedAlbum} : <b>${data.price.signed}*</b>`;

    const postageFee = document.createElement('I');
    postageFee.innerHTML = this._nls.merch.postageFee;

    const submit = document.createElement('BUTTON');
    submit.innerHTML = this._nls.merch.orderOne;

    if (data.remaining === 0) {
      const soldOut = document.createElement('P');
      soldOut.classList.add('sold-out');
      soldOut.innerHTML = this._nls.merch.soldOut;
      album.appendChild(soldOut);
      submit.setAttribute('disabled', 'disabled');
    } else {
      const remaining = document.createElement('P');
      remaining.classList.add('remaining');
      remaining.innerHTML = `${data.remaining} ${this._nls.merch.remaining}`;
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


  __buildApparelMerch(data) {
    const collection = document.createElement('DIV');
    collection.classList.add('merch-item');

    const image = document.createElement('IMG');
    image.src = data.image;

    const name = document.createElement('H2');
    name.innerHTML = data.name;

    const designed = document.createElement('P');
    designed.innerHTML = `${this._nls.merch.by} <b>${data.designer}</b>`;

    const price = document.createElement('P');
    price.innerHTML = `${data.type} : ${data.price}*`;

    const postageFee = document.createElement('I');
    postageFee.innerHTML = this._nls.merch.postageFee;

    const submit = document.createElement('BUTTON');
    submit.innerHTML = this._nls.merch.orderOne;

    if (data.remaining === 0) {
      const soldOut = document.createElement('P');
      soldOut.classList.add('sold-out');
      soldOut.innerHTML = this._nls.merch.soldOut;
      collection.appendChild(soldOut);
      submit.setAttribute('disabled', 'disabled');
    } else {
      const remaining = document.createElement('P');
      remaining.classList.add('remaining');
      remaining.innerHTML = `${data.remaining} ${this._nls.merch.remaining}`;
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


  _handleEvents() {
    return new Promise(resolve => {
      this._dom.querySelector('#back-button').addEventListener('click', this._updateLocation.bind(this, 'creation'));
      resolve();
    });
  }


}


export default MerchPage;
window.MerchPage = new MerchPage();
