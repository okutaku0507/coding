var Dispatcher = require('flux').Dispatcher;
var assign = require('object-assign');
var CodingConstants = require('../constants/CodingConstants');
var PayloadSources = CodingConstants.PayloadSources;

var CodingAppDispatcher = assign(new Dispatcher(), {

  handleAppServerAction: function(action) {
    var payload = {
      source: PayloadSources.APP_SERVER_ACTION,
      action: action
    };
    this.dispatch(payload);
  },

  handleViewAction: function(action) {
    var payload = {
      source: PayloadSources.VIEW_ACTION,
      action: action
    };
    this.dispatch(payload);
  }
});

module.exports = CodingAppDispatcher;
