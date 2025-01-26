import AbstractArtist from '../utils/AbstractArtist.js';


class NACPage extends AbstractArtist {


  constructor() {
    super();
    this._name = 'NAC';
    this._initArtist();
  }


}


export default NACPage;
window.NACPage = new NACPage();
