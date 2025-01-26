import AbstractArtist from '../utils/AbstractArtist.js';


class DropDiePage extends AbstractArtist {


  constructor() {
    super();
    this._name = 'Drop Die';
    this._initArtist();
  }


}


export default DropDiePage;
window.DropDiePage = new DropDiePage();
