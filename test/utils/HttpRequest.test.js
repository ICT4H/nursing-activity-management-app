import HttpRequest from "../../src/utils/HttpRequest";
import fetchMock from 'fetch-mock';

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
  describe('get', () => {
    afterEach(() => {
      fetchMock.restore();
    });
    it('should give response when status is 200 ', function (done) {
      fetchMock.mock('/someUrl', {data: {id: 'ID123'}});
      HttpRequest.get('/someUrl')
          .then(res => {
            expect(fetchMock.calls().length).toBe(1);
            expect(res.data.id).toBe('ID123');
            done();
          });
    });
    it('should not try to parse response if responseType is text', (done) => {
      fetchMock.mock('/someUrl', 'text response');
      HttpRequest.get('/someUrl', 'text')
          .then(res => {
            expect(fetchMock.calls().length).toBe(1);
            expect(res).toBe('text response');
            done();
          });
    });

    it('should throw an error when status is not 2xx', (done) => {
      fetchMock.mock('/someUrl', 404);
      HttpRequest.get('/someUrl')
          .then(() => {
          })
          .catch(err => {
            expect(err.response.status).toBe(404);
            done();
          });
    });
  })

  describe('post', () => {
    afterEach(() => {
      fetchMock.restore();
    });

    it('should be called with correct params and should return response ' +
        'when status is 200', (done) => {
      fetchMock.post('/someUrl', {data: {id: 123}});
      const inputBody = {name: 'someFormName'};
      HttpRequest.post('/someUrl', inputBody)
          .then(res => {
            expect(fetchMock.calls().length).toBe(1);
            expect(res.data.id).toBe(123);
            expect(JSON.parse(fetchMock.lastOptions('/someUrl').body)).toEqual(inputBody);
            done();
          });
    });

    it('should throw an error when status is not 200', (done) => {
      fetchMock.post('/someUrl', 404);
      HttpRequest.post('/someUrl', {name: 'someFormName'})
          .then(() => {
          })
          .catch(err => {
            expect(err.response.status).toBe(404);
            done();
          });
    });
  })
});
