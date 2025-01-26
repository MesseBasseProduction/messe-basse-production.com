import AbstractArtist from '../utils/AbstractArtist.js';


class SireCamaraPage extends AbstractArtist {


  constructor() {
    super();
    this._name = 'Siré Camara';
    this._initArtist();
  }


}


export default SireCamaraPage;
window.SireCamaraPage = new SireCamaraPage();
