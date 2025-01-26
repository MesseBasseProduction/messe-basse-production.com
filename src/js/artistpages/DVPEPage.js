import AbstractArtist from '../utils/AbstractArtist.js';


class DVPEPage extends AbstractArtist {


  constructor() {
    super();
    this._name = 'DVPE';
    this._initArtist();
  }


}


export default DVPEPage;
window.DVPEPage = new DVPEPage();
