import AbstractArtist from '../utils/AbstractArtist.js';


class LaBaroqueriePage extends AbstractArtist {


  constructor() {
    super();
    this._name = 'La Baroquerie du Val de Bièvre';
    this._initArtist();
  }


}


export default LaBaroqueriePage;
window.LaBaroqueriePage = new LaBaroqueriePage();
