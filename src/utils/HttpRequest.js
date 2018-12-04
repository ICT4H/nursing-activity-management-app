import 'whatwg-fetch';

class HttpRequest {
  static buildUrl(urlString, params) {
    var host = location.protocol.concat("//").concat(window.location.hostname);
    let url = new URL(host + urlString);
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

  static post(url, jsonBody) {
    return fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jsonBody),
    }).then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      }
      const error = new Error(response.statusText);
      error.response = response;
      throw error;
    })
  }

}

export default HttpRequest;
