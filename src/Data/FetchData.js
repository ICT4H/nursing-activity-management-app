import 'whatwg-fetch';
import DateUtils from "../utils/DateUtils";

class FetchData {
  static fetchDataForPatient(patientUuid ,dateStart, dateEnd, callback){
    let startDate = DateUtils.getFormattedDate(dateStart);
    let endDate = DateUtils.getFormattedDate(dateEnd);
    let url = new URL(`https://localhost/openmrs/ws/rest/v1/ipd/schedules/patient/${patientUuid}`);
    let params = {startDate,endDate};
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    fetch(url, {credentials: "include"}).then((res) => {
      res.json().then((schedules) => {
        callback(schedules);
        console.log(schedules);
      });
    }).catch((err) => {
      // console.log(err);
    });
  }
}

export default FetchData;
