jest.mock('whatwg-fetch');
import FetchData from "../../src/data/FetchData";
import {ipdSchedulesUrl} from "../../src/constants";

describe('FetchData', () => {
  describe('buildUrl', () => {
    it('should build url with given urlString and params', function () {
      const params = {firstParam:"first",secondParam:"second"};
      const builtUrl = FetchData.buildUrl("https://localhost/atSomePage",params);
      const expectedUrl= "https://localhost/atSomePage?firstParam=first&secondParam=second";
      expect(builtUrl.toString()).toBe(expectedUrl);

    });
  });
  describe('fetchDataForPatient', () => {
    it('should ', function () {
      let startDate = "12";
      let endDate = "13";
      const patientUuid = "123";
      let urlString = ipdSchedulesUrl + "patient/" + patientUuid;
      let url = FetchData.buildUrl(urlString, {startDate, endDate});

      FetchData.fetchDataForPatient(patientUuid,startDate,endDate,()=>{});

      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toBeCalledWith(url,{credentials: "include",headers: {"Accept": "application/json", "Content-Type": "application/json"}});

    });
  });
});
