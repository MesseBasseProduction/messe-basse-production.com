import AbstractArtist from '../utils/AbstractArtist.js';


class FiveOClockPage extends AbstractArtist {


  constructor() {
    super();
    this._name = 'Five O\'Clock Jazz Quartet';
    this._initArtist();
  }


}


export default FiveOClockPage;
window.FiveOClockPage = new FiveOClockPage();
