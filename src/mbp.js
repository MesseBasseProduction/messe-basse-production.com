import './mbp.scss';


class MBP {


	constructor() {
		this._lang = (navigator.language === 'fr') ? 'fr' : 'en';
		this._selectedPage = 'home';
		this._selectedSubpage = 'music';
		this._scrollBar = null;
		this._version = '0.1.0';
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
        this.evts.addEvent('click', document.getElementById('book-subpage'), this._buildBookSubpage, this);
        this.evts.addEvent('click', document.getElementById('software-subpage'), this._buildSoftwareSubpage, this);
				resolve();
			});
		});
	}


	_buildMerchPage() {
		return this._buildPage('merch');
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
		return this._buildSubpage(e, 'music');
	}


	_buildVideoSubpage(e) {
		return this._buildSubpage(e, 'video');
	}

	
	_buildPhotoSubpage(e) {
		return this._buildSubpage(e, 'photo');		
	}


	_buildBookSubpage(e) {
		return this._buildSubpage(e, 'book');
	}


	_buildSoftwareSubpage(e) {
		return this._buildSubpage(e, 'software');
	}


	/* Modals */


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
				setTimeout(resolve, 600); // CSS animation time
			};

			document.getElementById('overlay').style.display = 'flex';
			setTimeout(() => {
				document.getElementById('overlay').style.opacity = 1;
				setTimeout(() => {
					fetch(url)
						.then(data => {
							data.text().then(htmlString => {
								document.getElementById('overlay').appendChild(document.createRange().createContextualFragment(htmlString));
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
