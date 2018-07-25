const whatwgFetch = jest.genMockFromModule('whatwg-fetch');
whatwgFetch.fetch = (url) => jest.fn().mockImplementation(() => Promise.resolve({ ok: true }));

module.exports = whatwgFetch;
