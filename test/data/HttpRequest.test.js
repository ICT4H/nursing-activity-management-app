import HttpRequest from "../../src/data/HttpRequest";

beforeEach(() => {
  jest.clearAllMocks();
  jest.mock('whatwg-fetch');
});
describe('HttpRequest', () => {
  describe('buildUrl', () => {
    it('should build url with given urlString and params', function () {
      const params = {firstParam: "first", secondParam: "second"};
      const builtUrl = HttpRequest.buildUrl("https://localhost/atSomePage", params);
      const expectedUrl = "https://localhost/atSomePage?firstParam=first&secondParam=second";
      expect(builtUrl.toString()).toBe(expectedUrl);

    });
  });
});
