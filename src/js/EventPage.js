import AbstractMBP from './utils/AbstractMBP.js';
import Utils from './utils/Utils.js';


class EventPage extends AbstractMBP {


  constructor() {
    super();

    this._eventData = {};

    this._init()
      .then(this._initializeEventPage.bind(this))
      .then(this._buildEventPage.bind(this))
      .then(this._makeSceneVisible.bind(this));
  }


  _initializeEventPage() {
    return new Promise((resolve, reject) => {
      this._dom = document.querySelector('.events-wrapper');
      Utils.fetchData('events').then(data => {
        this._eventData = data;
        resolve();
      }).catch(reject);
    });
  }


  _buildEventPage() {
    return new Promise(resolve => {
      // First we determine user's local date formatted YYY-MM-DD
      this._now = new Date();
      const offset = this._now.getTimezoneOffset();
      this._now = new Date(this._now.getTime() - (offset * 60 * 1000));
      this._now = this._now.toISOString().split('T')[0]

      let hasUpcoming = false; // To know if the H1 requires to be added for upcoming event
      let hasPast = false;
      const years = {};

      for (let i = 0; i < this._eventData.events.length; ++i) {
        // First case, the event hasn't occured yet, it is an upcoming one
        if (hasUpcoming === false && this._eventData.events[i].date >= this._now) {
          hasUpcoming = true;
          const header = document.createElement('H1');
          header.innerHTML = this._nls.events.upcoming;
          this._dom.appendChild(header);
        } else if (this._eventData.events[i].date < this._now && hasPast === false) {
          hasPast = true;
          const header = document.createElement('H1');
          header.innerHTML = this._nls.events.past;
          this._dom.appendChild(header);
        }
        // Now check for year header in past events section
        const studiedYear = this._eventData.events[i].date.slice(0, 4);
        if (!years[studiedYear] && this._eventData.events[i].date < this._now) {
          years[studiedYear] = studiedYear;
          const header = document.createElement('H2');
          header.innerHTML = studiedYear;
          this._dom.appendChild(header);
        }

        const event = this.__buildEventDOM(this._eventData.events[i]);
        this._dom.appendChild(event);
      }

      resolve();
    });
  }


  __buildEventDOM(data) {
    const event = document.createElement('DIV');
    event.classList.add('event');
    event.classList.add('item');

    const image = document.createElement('IMG');
    image.src = data.image;

    const content = document.createElement('DIV');
    content.classList.add('content');
    content.innerHTML = `
      <span>
        <h1><a href="${data.link}" target="_blank" rel="noreferrer noopener">${data.title}</a></h1>
        <h2><i>${Utils.formatDate(data.date, this._lang)} – ${data.place}</i></h2>
      </span>
      <p>${data.description[this._lang]}</p>
    `;
    content.innerHTML.replace('\n', '');

    const starring = document.createElement('DIV');
    starring.classList.add('starring');

    for (let i = 0; i < data.starring.length; ++i) {
      const artist = document.createElement('A');
      artist.innerHTML = data.starring[i].name;
      artist.href = data.starring[i].url;
      artist.target = '_blank';
      artist.rel = 'noreferrer noopener';
      starring.appendChild(artist);
    }

    event.appendChild(image);
    event.appendChild(content);
    content.appendChild(starring);

    return event;
  }


}


export default EventPage;
window.EventPage = new EventPage();
