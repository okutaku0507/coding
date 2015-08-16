var CodingAppDispatcher = require('../dispatcher/CodingAppDispatcher');
var CodingConstants = require('../constants/CodingConstants');
var ActionTypes = CodingConstants.ActionTypes;
var assign = require('object-assign');

var BaseStore = require('../stores/BaseStore');

var SessionStore = assign({}, BaseStore, {

  getErrors: function() {
    return this.get('errors') || [];
  },

  getCode: function() {
    return this.get('code') || {};
  },

  getCodeId: function() {
    return this.getCode().id;
  },

  parse: function(json) {
    var code = json;
    this.set('code', {
      id: code.id,
      name: code.name,
      token: code.token,
      code: code.code
    });
  }
});

SessionStore.dispatchToken = CodingAppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {

    case ActionTypes.RECEIVE_CODE:
      SessionStore.parse(action.json);
      SessionStore.initialized();
      SessionStore.emitChange();
      break;

    case ActionTypes.LOGOUT:
      SessionStore.emitChange();
      break;

    default:
  }

  return true;
});

module.exports = SessionStore;
