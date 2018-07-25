import 'whatwg-fetch';
import {ipdSchedulesUrl} from "../constants";

class FetchData {
  static fetchDataForPatient(patientUuid, startDate, endDate, callback) {
    let urlString = ipdSchedulesUrl + "patient/" + patientUuid;
    let url = this.buildUrl(urlString, {startDate, endDate});

    fetch(url, {
      credentials: "include",
      headers: {"Accept": "application/json", "Content-Type": "application/json"}
    }).then((res) => {
      res.json().then((schedules) => {
        callback(schedules);
      }).catch(err => {
        console.log(err.message);
      });
    }).catch((err) => {
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
