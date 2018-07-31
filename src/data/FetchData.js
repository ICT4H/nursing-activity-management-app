import 'whatwg-fetch';

class FetchData {
  static buildUrl(urlString, params) {
    let url = new URL(urlString);
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    return url;
  }

  static get(url, responseType) {
    return fetch(url, {credentials: 'same-origin', Accept: 'application/json'})
        .then((response) => {
          if (response.status >= 200 && response.status < 300) {
            return responseType === 'text' ? response.text() : response.json();
          }
          else if (response.status === 401 || response.status === 403) {
            window.location.pathname = '/home';
            return null;
          }
          const error = new Error(response.statusText);
          error.response = response;
          throw error;
        })
  }

}

export default FetchData;
