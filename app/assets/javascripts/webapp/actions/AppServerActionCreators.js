var CodingAppDispatcher = require('../dispatcher/CodingAppDispatcher');
var CodingConstants = require('../constants/CodingConstants');
var ActionTypes = CodingConstants.ActionTypes;

module.exports = {

  receiveInitialData: function(json, errors) {
    CodingAppDispatcher.handleAppServerAction({
      type: ActionTypes.RECEIVE_INITIAL_DATA,
      json: json,
      errors: errors
    });
  },

  receiveCode: function(json) {
    CodingAppDispatcher.handleAppServerAction({
      type: ActionTypes.RECEIVE_CODE,
      json: json
    });
  }
};
