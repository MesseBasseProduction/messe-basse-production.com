import AbstractArtist from '../utils/AbstractArtist.js';


class TheForgePage extends AbstractArtist {


  constructor() {
    super();
    this._name = 'The Forge';
    this._initArtist();
  }


}


export default TheForgePage;
window.TheForgePage = new TheForgePage();
