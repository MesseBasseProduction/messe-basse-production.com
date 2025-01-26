import AbstractArtist from '../utils/AbstractArtist.js';


class LionelBaudetPage extends AbstractArtist {


  constructor() {
    super();
    this._name = 'Lionel Baudet';
    this._initArtist();
  }


}


export default LionelBaudetPage;
window.LionelBaudetPage = new LionelBaudetPage();
