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
      .then(this._sharedEvents.bind(this))
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
      Utils.replaceNlsString(this._dom, 'CONTACT_DOCUMENTATION', this._nls.contact.documentation);
      Utils.replaceNlsString(this._dom, 'CONTACT_TEAM', this._nls.contact.team);
      Utils.replaceNlsString(this._dom, 'CONTACT_TREE', this._nls.contact.tree);
      resolve();
    });
  }


  _buildContactPage() {
    return new Promise(resolve => {
      const documents = this._dom.querySelector('#doc-container');
      for (let i = 0; i < this._contactData.documents.length; ++i) {
        const doc = this.__buildDocumentDOM(this._contactData.documents[i]);
        documents.appendChild(doc);
      }

      this._docScroll = new window.ScrollBar({
        target: this._dom.querySelector('#doc-wrapper'),
        horizontal: true,
        minSize: 90,
        style: {
          color: '#FFBF00'
        }
      });

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

      const links  = this._dom.querySelector('#links-container');
      for (let i = 0; i < this._contactData.links.length; ++i) {
        const link = this.__buildLinkDOM(this._contactData.links[i]);
        links.appendChild(link);
      }

      resolve();
    });
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


  __buildLinkDOM(data) {
    const link = document.createElement('A');
    link.classList.add('link');
    link.href = data.url;
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');

    const image = document.createElement('IMG');
    image.src = data.icon;

    const name = document.createElement('P');
    name.innerHTML = data.name;

    link.appendChild(image);
    link.appendChild(name);

    return link;
  }


}


export default ContactPage;
window.ContactPage = new ContactPage();
