import Utils from '../utils/Utils.js';


class Events {


  constructor(options) {
    this._lang = options.lang;
    this._nls = options.nls;
    this._dom = null;
    // Today's date
    this._now = null;

    this._initDOM()
      .then(Utils.fetchData.bind(this, 'events'))
      .then(this._buildDOM.bind(this))
      .catch(err => console.error(err));
  }


  _initDOM() {
    return new Promise(resolve => {
      // Events page is fully Js constructed. No HTML required to fetch
      this._dom = document.createElement('SECTION');
      resolve();
    });
  }


  _buildDOM(data) {
    return new Promise(resolve => {
      // First we determine user's local date formatted YYY-MM-DD
      this._now = new Date();
      const offset = this._now.getTimezoneOffset();
      this._now = new Date(this._now.getTime() - (offset * 60 * 1000));
      this._now = this._now.toISOString().split('T')[0]

      let hasUpcoming = false; // To know if the H1 requires to be added for upcoming event
      let hasPast = false;
      const years = {};

      for (let i = 0; i < data.events.length; ++i) {
        // First case, the event hasn't occured yet, it is an upcoming one
        if (hasUpcoming === false && data.events[i].date > this._now) {
          hasUpcoming = true;
          const header = document.createElement('H1');
          header.innerHTML = this._nls.upcoming;
          this._dom.appendChild(header);
        } else if (hasPast === false) {
          hasPast = true;
          const header = document.createElement('H1');
          header.innerHTML = this._nls.past;
          this._dom.appendChild(header);
        }
        // Now check for year header in past events section
        const studiedYear = data.events[i].date.slice(0, 4);
        if (!years[studiedYear] && data.events[i].date < this._now) {
          years[studiedYear] = studiedYear;
          const header = document.createElement('H2');
          header.innerHTML = studiedYear;
          this._dom.appendChild(header);
        }

        const event = this.__buildEvent(data.events[i]);
        this._dom.appendChild(event);
      }

      resolve();
    });
  }


  __buildEvent(data) {
    const event = document.createElement('DIV');
    event.classList.add('event');

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


  get dom() {
    return this._dom;
  }


}

export default Events;
