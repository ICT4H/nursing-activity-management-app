import FetchData from "../../src/data/FetchData";

beforeEach(() => {
  jest.clearAllMocks();
  jest.mock('whatwg-fetch');
});
describe('FetchData', () => {
  describe('buildUrl', () => {
    it('should build url with given urlString and params', function () {
      const params = {firstParam: "first", secondParam: "second"};
      const builtUrl = FetchData.buildUrl("https://localhost/atSomePage", params);
      const expectedUrl = "https://localhost/atSomePage?firstParam=first&secondParam=second";
      expect(builtUrl.toString()).toBe(expectedUrl);

    });
  });
});
