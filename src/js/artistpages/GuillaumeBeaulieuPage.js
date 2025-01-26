import AbstractArtist from '../utils/AbstractArtist.js';


class GuillaumeBeaulieuPage extends AbstractArtist {


  constructor() {
    super();
    this._name = 'Guillaume Beaulieu';
    this._initArtist();
  }


}


export default GuillaumeBeaulieuPage;
window.GuillaumeBeaulieuPage = new GuillaumeBeaulieuPage();
