var CodingAppDispatcher = require('../dispatcher/CodingAppDispatcher');
var CodingConstants = require('../constants/CodingConstants');
var ActionTypes = CodingConstants.ActionTypes;
var WebAPIUtils = require('../utils/WebAPIUtils');

module.exports = {

  loadInitialData: function(params) {
    CodingAppDispatcher.handleViewAction({
      type: ActionTypes.LOAD_INITIAL_DATA
    });
    WebAPIUtils.loadInitialData(params);
  }
};
