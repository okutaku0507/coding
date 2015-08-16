var CodingAppDispatcher = require('../dispatcher/CodingAppDispatcher');
var CodingConstants = require('../constants/CodingConstants');
var ActionTypes = CodingConstants.ActionTypes;
var assign = require('object-assign');
var _ = require('underscore');

var BaseStore = require('../stores/BaseStore');
var InitialStore = require('../stores/InitialStore');
var SessionStore = require('../stores/SessionStore');

var RouteStore = assign({}, BaseStore, {

  getRouter: function() {
    return Coding.router;
  },

  getRouteNames: function() {
    return this.get('routeNames') || [];
  },

  setRouteNames: function(names) {
    this.set('routeNames', names);
  }
});

RouteStore.dispatchToken = CodingAppDispatcher.register(function(payload) {
  CodingAppDispatcher.waitFor([
    InitialStore.dispatchToken,
    SessionStore.dispatchToken
  ]);

  var action = payload.action;

  switch(action.type) {

    case ActionTypes.TRANSITION:
      RouteStore.setRouteNames(_.pluck(action.state.routes, 'name'));
      RouteStore.emitChange();
      break;

    case ActionTypes.LOGGED_OUT:
      location.href = '/sign_in';
      break;

    case ActionTypes.REDIRECT:
      RouteStore.getRouter().transitionTo(action.route, action.params);
      break;

    default:
  }

  return true;
});

module.exports = RouteStore;
