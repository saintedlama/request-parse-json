var expect = require('chai').expect;
var parseJson = require('../');

describe('requestParseJson', function() {
  it('should propagate errors', function(done) {
    var expectedErr = new Error();

    var next = function(err) {
      expect(err).to.equal(expectedErr);

      done();
    };

    parseJson(next)(expectedErr);
  });

  it('should not parse responses that are not of content-type "application/json"', function(done) {
    var next = function(err) {
      expect(err).to.exit;

      done();
    };

    parseJson(next)(null, { headers : { 'content-type' : 'application/json' }});
  });

  it('should not parse responses that have no headers', function(done) {
    var next = function(err) {
      expect(err).to.exit;

      done();
    };

    parseJson(next)(null, { });
  });

  it('should parse responses of content-type "application/json"', function(done) {
    var next = function(err, response, data) {
      expect(err).to.not.exit;
      expect(data).to.deep.equal({ works : true });

      done();
    };

    parseJson(next)(null, { headers : { 'content-type' : 'application/json' }}, '{ "works" : true }');
  });
});