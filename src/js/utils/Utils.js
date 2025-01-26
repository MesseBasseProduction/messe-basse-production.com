class Utils {


  constructor() {}


  static replaceString(element, string, value) {
    if (!element || !element.innerHTML || !string || typeof string !== 'string' || !value || typeof value !== 'string') {
      return false;
    }

    element.innerHTML = element.innerHTML.replace(string, value);
    return true;
  }


  static replaceNlsString(parent, string, value) {
    const element = parent.querySelector(`[data-nls="${string}"]`);
    if (!element || !element.innerHTML || !string || typeof string !== 'string' || !value || typeof value !== 'string') {
      return false;
    }

    element.innerHTML = value;
    return true;
  }


  static sleep(time) {
    return new Promise((resolve) => {
      setTimeout(() => {
        return resolve(null);
      }, time);
    });
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


  static formatDate(date, lang) {
    const dateObj = new Date(date);
    const formatter = new Intl.DateTimeFormat(lang, { month: 'long' });
    const month = formatter.format(dateObj);
    if (lang === 'en') {
      return `${month} ${dateObj.getDate()}, ${dateObj.getFullYear()}`;
    } else {
      return `${dateObj.getDate()} ${Utils.capitalizeFirstLetter(month)} ${dateObj.getFullYear()}`;
    }
  }


  static capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


}


export default Utils;
