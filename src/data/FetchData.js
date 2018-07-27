import 'whatwg-fetch';
import {hostFullURL, ipdSchedulesUrl} from "../constants";

class FetchData {
  static fetchSchedulesForPatient(patientUuid, startDate, endDate, callback) {
    let urlString = ipdSchedulesUrl + "patient/" + patientUuid;
    let url = this.buildUrl(urlString, {startDate, endDate});

    const onFulFilled = (res) => {
      res.json().then((schedules) => {
        callback(schedules);
      }).catch(err => {
        console.log(err.message);
      });
    };

    fetch(url, {
      credentials: "include",
      headers: {"Accept": "application/json", "Content-Type": "application/json"}
    }).then(onFulFilled).catch((err) => {
      console.log(err);
    });
  }

  static fetchPrescribedDrugsForPatient(patientUuid, startDate, endDate, callback) {
    let urlString = hostFullURL + "bahmnicore/drugOrders/active";
    let url = this.buildUrl(urlString, {patientUuid});

    const onFulFilled = (res) => {
      res.json().then((drugOrders) => {
        callback(drugOrders);
      }).catch(err => {
        console.log(err.message);
      });
    };

    fetch(url, {
      credentials: "include",
      headers: {"Accept": "application/json", "Content-Type": "application/json"}
    }).then(onFulFilled).catch((err) => {
      console.log(err);
    });
  }

  static buildUrl(urlString, params) {
    let url = new URL(urlString);
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    return url;
  }
}

export default FetchData;
