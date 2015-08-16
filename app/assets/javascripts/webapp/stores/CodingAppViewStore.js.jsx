var CodingAppDispatcher = require('../dispatcher/CodingAppDispatcher');
var CodingConstants = require('../constants/CodingConstants');
var ActionTypes = CodingConstants.ActionTypes;
var assign = require('object-assign');

var BaseStore = require('../stores/BaseStore');

var CodingAppViewStore = assign({}, BaseStore, {
  getNotificationMessages: function() {
    if (!this.get('notificationMessages')) {
      this.set('notificationMessages', []);
    }
    return this.get('notificationMessages');
  },

  setNotificationMessages: function(messages) {
    this.get('notificationMessages').push(messages);
  },

  getModalVisibility: function() {
    return this.get('modalVisibility');
  },

  openModal: function() {
    if (!this.isModalLocked()) {
      this.set('modalVisibility', true);
    }
  },

  closeModal: function() {
    if (!this.isModalLocked()) {
      this.set('modalVisibility', false);
    }
  },

  getModalNode: function() {
    return this.get('modalNode');
  },

  getModalOptions: function() {
    return this.get('modalOptions');
  },

  setModalNode: function(node, options) {
    this.set('modalNode', node);
    this.set('modalOptions', options);
  },

  clearModalNode: function() {
    this.set('modalNode', null);
    this.set('modalOptions', null);
  },

  lockModal: function() {
    this.set('isModalLocked', true);
  },

  unlockModal: function() {
    this.set('isModalLocked', false);
  },

  isModalLocked: function() {
    return this.get('isModalLocked');
  }
});


CodingAppViewStore.dispatchToken = CodingAppDispatcher.register(function(payload) {
  var action = payload.action;
  switch(action.type) {
    default:
  }
  return true;
});

module.exports = CodingAppViewStore;
