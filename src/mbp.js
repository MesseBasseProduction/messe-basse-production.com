import CustomEvents from './js/CustomEvents';
import './mbp.scss';


class MBP {


	constructor() {
		this._selectedPage = 'home';
		this.evts = new CustomEvents();
		this._displayConsoleWelcome();
		this._hideFlashingLogo()
			.then(this._buildNav.bind(this))
			.then(this._buildHomepage.bind(this));
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
			setTimeout(() => {
				document.body.removeChild(document.getElementById('flashing-text-logo'));
				resolve();
			}, 6000);
		});
	}


	_buildNav() {
		return new Promise(resolve => {			
			document.getElementById('navigation').style.opacity = 1;
			setTimeout(() => document.getElementById('link-home').style.animation = 'drop-nav-link 1.8s forwards', 500);
			setTimeout(() => document.getElementById('link-creation').style.animation = 'drop-nav-link 1.7s forwards', 750);
			setTimeout(() => document.getElementById('link-merch').style.animation = 'drop-nav-link 1.6s forwards', 1000);
			setTimeout(() => document.getElementById('link-contact').style.animation = 'drop-nav-link 1.5s forwards', 1250);
			setTimeout(() => document.getElementById('socials').style.opacity = 1, 2250);

			document.getElementById('link-home').addEventListener('click', this._buildHomepage.bind(this));
			document.getElementById('link-creation').addEventListener('click', this._buildCreationpage.bind(this));
			document.getElementById('link-merch').addEventListener('click', this._buildMerchpage.bind(this));
			document.getElementById('link-contact').addEventListener('click', this._buildContactpage.bind(this));

			setTimeout(resolve, 1500);
		});
	}


	/* Pages */


	_buildHomepage() {
		return new Promise(resolve => {
			this._fetchTemplate('assets/html/home.html', 'home').then(resolve);
		});
	}


	_buildCreationpage() {
		return new Promise(resolve => {
			this._fetchTemplate('assets/html/creation.html', 'creation').then(() => {
				this.evts.addEvent('click', document.getElementById('podcast-rg'), this._buildPodcastModal, this);
				resolve();
			});
		});
	}


	_buildMerchpage() {
		return new Promise(resolve => {
			this._fetchTemplate('assets/html/merch.html', 'merch').then(resolve);
		});
	}	


	_buildContactpage() {
		return new Promise(resolve => {
			this._fetchTemplate('assets/html/contact.html', 'contact').then(() => {
				this.evts.addEvent('click', document.getElementById('credit-modal'), this._buildCreditModal, this);
				resolve();
			});
		});
	}	


	/* Modals */


	_buildPodcastModal(e) {
		return new Promise(resolve => {
			this._fetchModal('assets/html/modal/podcast.html', e.target).then(() => {
				resolve();
			});
		});
	}


	_buildCreditModal() {
		return new Promise(resolve => {
			this._fetchModal('assets/html/modal/credit.html').then(() => {
				resolve();
			});
		});
	}


	/* Utils */


	_fetchTemplate(url, className) {
		return new Promise((resolve, reject) => {
			this.evts.removeAllEvents();
			document.getElementById(`link-${this._selectedPage}`).classList.remove('selected');
			this._selectedPage = className;
			document.getElementById(`link-${this._selectedPage}`).classList.add('selected');
			document.getElementById('scene').style.opacity = 0;
			setTimeout(() => {
				fetch(url)
					.then(data => {
						data.text().then(htmlString => {
							document.getElementById('scene').classList.remove('selected');
							document.getElementById('scene').className = className;
							document.getElementById('scene').innerHTML = '';
							document.getElementById('scene').appendChild(document.createRange().createContextualFragment(htmlString));
							document.getElementById('scene').style.opacity = 1;
							setTimeout(resolve, 600);
					})
					.catch(reject);
				})
				.catch(reject);
			}, 600);
		});
	}


	_fetchModal(url, target) {
		return new Promise((resolve, reject) => {
			const evtIds = [];
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

			const displayModal = () => {
				setTimeout(() => {
					document.getElementById('modal').style.opacity = 1;
					evtIds.push(this.evts.addEvent('click', document.getElementById('overlay'), closeModal, this));
					evtIds.push(this.evts.addEvent('click', document.getElementById('close-modal'), closeModal, this));
					setTimeout(resolve, 600);
				}, 50);
			};

			const fillModal = type => {
				fetch(`assets/json/${type}.json`)
					.then(data => {
						data.json().then(json => {
							document.getElementById('modal').innerHTML = document.getElementById('modal').innerHTML.replace('{{PODCAST_TITLE}}', json.title);		
							document.getElementById('modal').innerHTML = document.getElementById('modal').innerHTML.replace('{{PODCAST_IMG}}', json.img);
							document.getElementById('modal').innerHTML = document.getElementById('modal').innerHTML.replace('{{PODCAST_IMG_ALT}}', json.imgAlt);
							document.getElementById('modal').innerHTML = document.getElementById('modal').innerHTML.replace('{{PODCAST_DESC}}', json.desc);
							// Copy season HTML before modification to append new one
							const season = document.createRange().createContextualFragment(document.getElementById('season-1').outerHTML);
							for (let i = 0; i < json.s.length; ++i) {
								if (i > 0) { // Create new season and append it to modal container
									const node = season.cloneNode(true);
									node.id = `season-${i + 1}`;									
									document.getElementById('main-container').appendChild(node);
								}

								const seasonName = `Saison ${i + 1} : ${json.s[i].name}`;
								document.getElementById('modal').innerHTML = document.getElementById('modal').innerHTML.replace('{{PODCAST_SEASON_NAME}}', seasonName);
								const episode = document.createRange().createContextualFragment(document.getElementById('episode-1').outerHTML);
								for (let j = 0; j < json.s[i].e.length; ++j) {
									if (j > 0) { //Create new episode and appendi it to season container
										const node = episode.cloneNode(true);
										node.id = `episode-${j + 1}`;
										console.log(node.id)
										document.getElementById('episodes-container').appendChild(node);
									}

									document.getElementById('modal').innerHTML = document.getElementById('modal').innerHTML.replace('{{PODCAST_EPISODE_IMG}}', json.s[i].e[j].img);
									document.getElementById('modal').innerHTML = document.getElementById('modal').innerHTML.replace('{{PODCAST_EPISODE_NAME}}', json.s[i].e[j].name);
								}
							}

							displayModal();
					})
					.catch(reject);
				})
				.catch(reject);
			};

			document.getElementById('overlay').style.display = 'flex';
			setTimeout(() => {
				document.getElementById('overlay').style.opacity = 1;
				setTimeout(() => {
					fetch(url)
						.then(data => {
							data.text().then(htmlString => {
								document.getElementById('overlay').appendChild(document.createRange().createContextualFragment(htmlString));
								if (!target) {
									displayModal();
								} else {
									fillModal(target.dataset.name);
								}
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
