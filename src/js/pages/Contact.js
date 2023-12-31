import Utils from '../utils/Utils.js';


class Contact {


  constructor(options) {
    this._lang = options.lang;
    this._nls = options.nls;
    this._dom = null;
    this._docScroll = null;

    Utils.fetchPage('/assets/html/contact.html')
      .then(this._initDOM.bind(this))
      .then(this._translatePage.bind(this))
      .then(Utils.fetchData.bind(this, 'contact'))
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
      Utils.replaceString(this._dom, '{{CONTACT_TITLE}}', this._nls.title);
      Utils.replaceString(this._dom, '{{CONTACT_DESCRIPTION1}}', this._nls.description1);
      Utils.replaceString(this._dom, '{{CONTACT_DESCRIPTION2}}', this._nls.description2);
      Utils.replaceString(this._dom, '{{CONTACT_DESCRIPTION3}}', this._nls.description3);
      Utils.replaceString(this._dom, '{{CONTACT_TEAM}}', this._nls.team);
      Utils.replaceString(this._dom, '{{CONTACT_DOCUMENTATION}}', this._nls.documentation);
      resolve();
    });
  }


  _buildDOM(data) {
    return new Promise(resolve => {
      const leaders = this._dom.querySelector('#leaders');
      for (let i = 0; i < data.leaders.length; ++i) {
        const leader = this.__buildMember(data.leaders[i]);
        leaders.appendChild(leader);
      }
      
      const members = this._dom.querySelector('#members');
      for (let i = 0; i < data.members.length; ++i) {
        const member = this.__buildMember(data.members[i]);
        members.appendChild(member);
      }

      const documents = this._dom.querySelector('#documents');
      for (let i = 0; i < data.documents.length; ++i) {
        const doc = this.__buildDocument(data.documents[i]);
        documents.appendChild(doc);
      }

      this._dom.querySelector('#credit-modal').addEventListener('click', this._openCreditModal.bind(this));

      this._docScroll = new window.ScrollBar({
        target: this._dom.querySelector('#documents'),
        minSize: 90
      });

      resolve();
    });
  }


  __buildMember(data) {
    const member = document.createElement('DIV');
    member.classList.add('member');

    const image = document.createElement('IMG');
    image.src = data.image;

    const name = document.createElement('H2');
    name.innerHTML = data.name;

    const role = document.createElement('H3');
    role.innerHTML = this._nls.roles[data.role];

    member.appendChild(image);
    member.appendChild(name);
    member.appendChild(role);

    return member;
  }


  __buildDocument(data) {
    const doc = document.createElement('A');
    doc.classList.add('doc-download');
    doc.download = true;
    doc.href = data.url;

    const image = document.createElement('IMG');
    image.src = '/assets/img/logo/pdf.svg';

    const name = document.createElement('P');
    name.innerHTML = data.name;

    const date = document.createElement('SPAN');
    date.innerHTML = data.date;

    doc.appendChild(image);
    doc.appendChild(name);
    name.appendChild(date);

    return doc;
  }


  /* Modal events */


  _openCreditModal() {
    Utils.fetchPage('/assets/html/modal/credit.html').then(dom => {
      const modal = document.createElement('DIV');
      modal.classList.add('modal');
      modal.classList.add('credit');
      modal.appendChild(dom);

      Utils.replaceString(modal, '{{ABOUT_TITLE}}', this._nls.aboutTitle);
      Utils.replaceString(modal, '{{ABOUT_DESCRIPTION1}}', this._nls.aboutDescription1);
      Utils.replaceString(modal, '{{ABOUT_DESCRIPTION2}}', this._nls.aboutDescription2);
      Utils.replaceString(modal, '{{ABOUT_DESCRIPTION3}}', this._nls.aboutDescription3);
      Utils.replaceString(modal, '{{ABOUT_DESCRIPTION4}}', this._nls.aboutDescription4);
      Utils.replaceString(modal, '{{ABOUT_CLOSE}}', this._nls.aboutClose);

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



  _updateScrolls() {
    // Ensure scrollbar do appear after switching view
    setTimeout(() => this._docScroll.updateScrollbar(), 500);
  }


  get dom() {
    this._updateScrolls();
    return this._dom;
  }


}

export default Contact;
