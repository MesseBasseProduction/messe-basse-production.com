import AbstractMBP from '../utils/AbstractMBP.js';
import Utils from '../utils/Utils.js';


class PodcastPage extends AbstractMBP {


  constructor() {
    super();

    this._podcastData = {};

    this._init()
      .then(this._initializePodcastPage.bind(this))
      .then(this._translatePodcastPage.bind(this))
      .then(this._buildPodcastPage.bind(this))
      .then(this._handleEvents.bind(this))
      .then(this._makeSceneVisible.bind(this));
  }


  _initializePodcastPage() {
    return new Promise((resolve, reject) => {
      this._dom = document.getElementById('scene');
      Utils.fetchData('podcast').then(data => {
        this._podcastData = data.podcast;
        resolve();
      }).catch(reject);
    });
  }


  _translatePodcastPage() {
    return new Promise((resolve) => {
      const nav = document.getElementById('navigation');
      Utils.replaceNlsString(nav, 'NAVBAR_CREATION', this._nls.creation.podcast);
      Utils.replaceNlsString(this._dom, 'VIDEO_TITLE', this._nls.video.title);
      Utils.replaceNlsString(this._dom, 'VIDEO_DESCRIPTION', this._nls.video.description);
      resolve();
    });
  }


  _buildPodcastPage() {
    return new Promise(resolve => {
      for (let i = 0; i < this._podcastData.length; ++i) {
        const podcast = document.createElement('DIV');
        podcast.classList.add('collection');
        const title = document.createElement('H2');
        title.innerHTML = this._podcastData[i].name;
        const description = document.createElement('P');
        description.innerHTML = this._podcastData[i].description[this._lang];
        podcast.appendChild(title);
        podcast.appendChild(description);
        const episodes = document.createElement('DIV');
        for (let j = 0; j < this._podcastData[i].episodes.length; ++j) {
          const episode = document.createElement('DIV');
          episode.classList.add('item');

          const image = document.createElement('IMG');
          image.src = this._podcastData[i].episodes[j].image;

          const content = document.createElement('DIV');
          content.classList.add('content');
          content.innerHTML = `
            <span>
              <h1><a href="${this._podcastData[i].episodes[j].link}" target="_blank" rel="noreferrer noopener">${this._podcastData[i].episodes[j].title}</a></h1>
            </span>
            <p>${this._podcastData[i].episodes[j].description[this._lang]}</p>
          `;
          content.innerHTML.replace('\n', '');

          const links = document.createElement('DIV');
          links.classList.add('links');
      
          for (let k = 0; k < this._podcastData[i].episodes[j].links.length; ++k) {
            const link = document.createElement('A');
            link.innerHTML = this._podcastData[i].episodes[j].links[k].name;
            link.href = this._podcastData[i].episodes[j].links[k].url;
            link.target = '_blank';
            link.rel = 'noreferrer noopener';
            links.appendChild(link);
          }

          content.appendChild(links);
          episode.appendChild(image);
          episode.appendChild(content);
          episodes.appendChild(episode);
        }
        podcast.appendChild(episodes);
        this._dom.querySelector('#podcast-list').appendChild(podcast);
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


}


export default PodcastPage;
window.PodcastPage = new PodcastPage();
