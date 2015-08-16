var CodingAppDispatcher = require('../dispatcher/CodingAppDispatcher');
var CodingConstants = require('../constants/CodingConstants');
var ActionTypes = CodingConstants.ActionTypes;

module.exports = {

  transition: function (handler, state) {
    CodingAppDispatcher.handleViewAction({
      type: ActionTypes.TRANSITION,
      handler: handler,
      state: state
    });
  },

  redirect: function(route, params) {
    CodingAppDispatcher.handleViewAction({
      type: ActionTypes.REDIRECT,
      route: route,
      params: params
    });
  }
};
