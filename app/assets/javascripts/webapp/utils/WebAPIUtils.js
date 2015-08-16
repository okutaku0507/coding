var AppServerActionCreators = require('../actions/AppServerActionCreators');
var CodingConstants = require('../constants/CodingConstants');
var request = require('superagent');

function _getErrors(res) {
  var errorMsgs = ["Something went wrong, please try again"];
  if ((json = JSON.parse(res.text))) {
    if (json['errors']) {
      errorMsgs = json['errors'];
    } else if (json['error']) {
      errorMsgs = [json['error']];
    }
  }
  return errorMsgs;
}

var APIEndpoints = CodingConstants.APIEndpoints;

module.exports = {
  csrfToken: function() {
    return document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  },

  loadInitialData: function() {
    request.get(APIEndpoints.CODES + '/initializer')
      .set('Accept', 'application/json')
      .end(function(error, res){
        if (res) {
          if (res.error) {
            var errorMsgs = _getErrors(res);
            // todo errorhandling
          } else {
            var json = JSON.parse(res.text);
            AppServerActionCreators.receiveInitialData(json, error);
          }
        }
      });
  }
};
