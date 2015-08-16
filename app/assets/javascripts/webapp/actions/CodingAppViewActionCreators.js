var _ = require('underscore');

var CodingAppDispatcher = require('../dispatcher/CodingAppDispatcher');
var CodingConstants = require('../constants/CodingConstants');
var ActionTypes = CodingConstants.ActionTypes;

module.exports = {

  openModal: function() {
    CodingAppDispatcher.handleViewAction({
      type: ActionTypes.OPEN_MODAL
    });
  },

  closeModal: function() {
    CodingAppDispatcher.handleViewAction({
      type: ActionTypes.CLOSE_MODAL
    });
  },

  setModalNode: function(node, options) {
    CodingAppDispatcher.handleViewAction({
      type: ActionTypes.SET_MODAL_NODE,
      node: node,
      options: options
    });
  },

  clearModalNode: function() {
    CodingAppDispatcher.handleViewAction({
      type: ActionTypes.CLEAR_MODAL_NODE
    });
  },

  lockModal: function() {
    CodingAppDispatcher.handleViewAction({
      type: ActionTypes.LOCK_MODAL
    });
  },

  unlockModal: function() {
    CodingAppDispatcher.handleViewAction({
      type: ActionTypes.UNLOCK_MODAL
    });
  }
};
