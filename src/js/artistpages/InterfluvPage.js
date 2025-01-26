import AbstractArtist from '../utils/AbstractArtist.js';


class InterfluvPage extends AbstractArtist {


  constructor() {
    super();
    this._name = 'Interfluv';
    this._initArtist();
  }


}


export default InterfluvPage;
window.InterfluvPage = new InterfluvPage();
