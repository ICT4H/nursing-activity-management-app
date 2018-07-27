import FetchData from "../../src/data/FetchData";
import {hostFullURL, ipdSchedulesUrl} from "../../src/constants";

beforeEach(() => {
  jest.clearAllMocks();
  jest.mock('whatwg-fetch');
});
describe('FetchData', () => {
  describe('buildUrl', () => {
    it('should build url with given urlString and params', function () {
      const params = {firstParam:"first",secondParam:"second"};
      const builtUrl = FetchData.buildUrl("https://localhost/atSomePage",params);
      const expectedUrl= "https://localhost/atSomePage?firstParam=first&secondParam=second";
      expect(builtUrl.toString()).toBe(expectedUrl);

    });
  });
  describe('fetchSchedulesForPatient', () => {
    it('should call fetch method with schedules url and headers', function () {
      let startDate = "12";
      let endDate = "13";
      const patientUuid = "123";
      let urlString = ipdSchedulesUrl + "patient/" + patientUuid;
      let url = FetchData.buildUrl(urlString, {startDate, endDate});

      FetchData.fetchSchedulesForPatient(patientUuid,startDate,endDate,()=>{});

      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toBeCalledWith(url,{credentials: "include",headers: {"Accept": "application/json", "Content-Type": "application/json"}});

    });
  });

  describe('fetchPrescribedDrugsForPatient', () => {
    it('should call fetch method with drugOrder url and headers', function () {
      let startDate = "12";
      let endDate = "13";
      const patientUuid = "123";
      let urlString = hostFullURL + "bahmnicore/drugOrders/active";
      let url = FetchData.buildUrl(urlString, {patientUuid});

      FetchData.fetchPrescribedDrugsForPatient(patientUuid,startDate,endDate,()=>{});

      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toBeCalledWith(url,{credentials: "include",headers: {"Accept": "application/json", "Content-Type": "application/json"}});

    });
  });
});
