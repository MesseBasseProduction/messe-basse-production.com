import AbstractMBP from './utils/AbstractMBP.js';
import Utils from './utils/Utils.js';


class ContactPage extends AbstractMBP {


  constructor() {
    super();

    this._contactData = {};
    this._docScroll = null;
    
    this._init()
      .then(this._initializeContactPage.bind(this))
      .then(this._translateContactPage.bind(this))
      .then(this._buildContactPage.bind(this))
      .then(this._makeSceneVisible.bind(this));
  }


  _initializeContactPage() {
    return new Promise((resolve, reject) => {
      this._dom = document.getElementById('scene');
      Utils.fetchData('contact').then(data => {
        this._contactData = data;
        resolve();
      }).catch(reject);
    });
  }


  _translateContactPage() {
    return new Promise((resolve) => {
      Utils.replaceNlsString(this._dom, 'CONTACT_TITLE', this._nls.contact.title);
      Utils.replaceNlsString(this._dom, 'CONTACT_DESCRIPTION1', this._nls.contact.description1);
      Utils.replaceNlsString(this._dom, 'CONTACT_DESCRIPTION2', this._nls.contact.description2);
      Utils.replaceNlsString(this._dom, 'CONTACT_DESCRIPTION3', this._nls.contact.description3);
      Utils.replaceNlsString(this._dom, 'CONTACT_TEAM', this._nls.contact.team);
      Utils.replaceNlsString(this._dom, 'CONTACT_DOCUMENTATION', this._nls.contact.documentation);
      resolve();
    });
  }


  _buildContactPage() {
    return new Promise(resolve => {
      const leaders = this._dom.querySelector('#leaders');
      for (let i = 0; i < this._contactData.leaders.length; ++i) {
        const leader = this.__buildMemberDOM(this._contactData.leaders[i]);
        leaders.appendChild(leader);
      }
      
      const members = this._dom.querySelector('#members');
      for (let i = 0; i < this._contactData.members.length; ++i) {
        const member = this.__buildMemberDOM(this._contactData.members[i]);
        members.appendChild(member);
      }

      const documents = this._dom.querySelector('#documents');
      for (let i = 0; i < this._contactData.documents.length; ++i) {
        const doc = this.__buildDocumentDOM(this._contactData.documents[i]);
        documents.appendChild(doc);
      }

      this._dom.querySelector('#credit-modal').addEventListener('click', this._openCreditModal.bind(this));

      this._docScroll = new window.ScrollBar({
        target: this._dom.querySelector('#documents'),
        minSize: 90,
        style: {
          color: '#FFBF00'
        }
      });

      resolve();
    });
  }


  __buildMemberDOM(data) {
    const member = document.createElement('DIV');
    member.classList.add('member');

    const image = document.createElement('IMG');
    image.src = data.image;

    const name = document.createElement('H2');
    name.innerHTML = data.name;

    const role = document.createElement('H3');
    role.innerHTML = this._nls.contact.roles[data.role];

    member.appendChild(image);
    member.appendChild(name);
    member.appendChild(role);

    return member;
  }


  __buildDocumentDOM(data) {
    const doc = document.createElement('A');
    doc.classList.add('doc-download');
    doc.href = data.url;

    const image = document.createElement('IMG');
    image.src = '/assets/img/logo/pdf.svg';

    const name = document.createElement('P');
    name.innerHTML = data.name;

    const date = document.createElement('SPAN');
    date.innerHTML = Utils.formatDate(data.date, this._lang);

    doc.download = `${data.name} Messe Basse Production – ${Utils.formatDate(data.date, this._lang)}`;

    doc.appendChild(image);
    doc.appendChild(name);
    name.appendChild(date);

    return doc;
  }


  _openCreditModal() {
    Utils.fetchPage('/assets/html/modal/credit.html').then(dom => {
      const modal = document.createElement('DIV');
      modal.classList.add('modal');
      modal.classList.add('credit');
      modal.appendChild(dom);

      Utils.replaceNlsString(modal, 'ABOUT_TITLE', this._nls.aboutTitle);
      Utils.replaceNlsString(modal, 'ABOUT_DESCRIPTION1', this._nls.aboutDescription1);
      Utils.replaceNlsString(modal, 'ABOUT_DESCRIPTION2', this._nls.aboutDescription2);
      Utils.replaceNlsString(modal, 'ABOUT_DESCRIPTION3', this._nls.aboutDescription3);
      Utils.replaceNlsString(modal, 'ABOUT_DESCRIPTION4', this._nls.aboutDescription4);
      Utils.replaceNlsString(modal, 'ABOUT_CLOSE', this._nls.aboutClose);

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


}


export default ContactPage;
window.ContactPage = new ContactPage();
