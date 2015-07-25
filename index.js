module.exports = function(next) {
  return function(err, response, body) {
    if (err) { return next(err, response, null, body); }

    if (response.headers && response.headers['content-type'].indexOf('application/json') == 0) {
      try {
        var parsed = JSON.parse(body);
        return next(null, response, parsed, body);
      } catch(e) {
        return next(e, response, null, body);
      }
    } else {
      return next(new Error('Content-Type expected "application/json"', response, null, body));
    }
  }
};