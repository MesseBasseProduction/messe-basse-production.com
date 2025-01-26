import AbstractMBP from '../utils/AbstractMBP.js';
import Utils from '../utils/Utils.js';


class VideoPage extends AbstractMBP {


  constructor() {
    super();

    this._videoData = {};

    this._init()
      .then(this._initializeVideoPage.bind(this))
      .then(this._translateVideoPage.bind(this))
      .then(this._buildVideoPage.bind(this))
      .then(this._handleEvents.bind(this))
      .then(this._makeSceneVisible.bind(this));
  }


  _initializeVideoPage() {
    return new Promise((resolve, reject) => {
      this._dom = document.getElementById('scene');
      Utils.fetchData('video').then(data => {
        this._videoData = data.videos;
        resolve();
      }).catch(reject);
    });
  }


  _translateVideoPage() {
    return new Promise((resolve) => {
      const nav = document.getElementById('navigation');
      Utils.replaceNlsString(nav, 'NAVBAR_CREATION', this._nls.creation.video);
      Utils.replaceNlsString(this._dom, 'VIDEO_TITLE', this._nls.video.title);
      Utils.replaceNlsString(this._dom, 'VIDEO_DESCRIPTION', this._nls.video.description);
      resolve();
    });
  }


  _buildVideoPage() {
    return new Promise(resolve => {
      for (let i = 0; i < this._videoData.length; ++i) {
        const video = document.createElement('DIV');
        video.classList.add('embed-video');
        video.innerHTML = `
          <iframe src="${this._videoData[i].url}" title="${this._videoData[i].artist} – ${this._videoData[i].name}" allowfullscreen="" sandbox="allow-same-origin allow-scripts allow-popups" frameborder="0"></iframe>
          <h2>${this._videoData[i].artist} – ${this._videoData[i].name}, ${Utils.formatDate(this._videoData[i].date, this._lang)}</h2>
        `;
        video.innerHTML.replace('\n', '');
        this._dom.querySelector('#video-grid').appendChild(video);
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


export default VideoPage;
window.VideoPage = new VideoPage();
