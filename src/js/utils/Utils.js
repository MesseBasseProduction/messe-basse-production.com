class Utils {


  constructor() {}


  static replaceString(element, string, value) {
    if (!element || !element.innerHTML || !string || typeof string !== 'string' || !value || typeof value !== 'string') {
      return false;
    }

    element.innerHTML = element.innerHTML.replace(string, value);
    return true;
  }


  static fetchPage(url) {
    return new Promise((resolve, reject) => {
      fetch(url).then(data => {
        data.text().then(htmlString => {
          resolve(document.createRange().createContextualFragment(htmlString));
        }).catch(reject);
      }).catch(reject);
    });
  }


  static fetchData(url) {
    return new Promise((resolve, reject) => {
      fetch(`/assets/json/data/${url}.json`).then(data => {
        data.json().then(resolve).catch(reject);
      }).catch(reject);
    });
  }


}


export default Utils;
