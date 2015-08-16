var CodingAppDispatcher = require('../dispatcher/CodingAppDispatcher');
var CodingConstants = require('../constants/CodingConstants');
var ActionTypes = CodingConstants.ActionTypes;
var assign = require('object-assign');

var BaseStore = require('../stores/BaseStore');
var SessionStore = require('../stores/SessionStore');

var InitialStore = assign({}, BaseStore, {});

// Store for initializing
InitialStore.dispatchToken = CodingAppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {

    case ActionTypes.RECEIVE_INITIAL_DATA:
      SessionStore.parse(action.json.code);
      SessionStore.initialized();
      SessionStore.emitChange();

      InitialStore.initialized();
      InitialStore.emitChange();
      break;

    default:
  }

  return true;
});

module.exports = InitialStore;
