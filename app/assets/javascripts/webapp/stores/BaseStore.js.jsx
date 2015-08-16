var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var INITIALIZED_EVENT = 'initialized';
var CHANGE_EVENT = 'change';

var BaseStore = assign({}, EventEmitter.prototype, {

  _storage: null,

  _hasInitialized: false,

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  // aleas
  addListener: function(eventName, callback) {
    this.on(eventName, callback)
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  hasInitialized: function() {
    return this._hasInitialized;
  },

  initialized: function() {
    if (!this._hasInitialized) {
      this._hasInitialized = true;
    }
  },

  unInitialized: function() {
    if (this._hasInitialized) {
      this._hasInitialized = false;
    }
  },

  getStorage: function() {
    if (this._storage) {
      return this._storage;
    } else {
      newObj = {};
      this._storage = newObj;
      return newObj;
    }
  },

  setStorage: function(obj) {
    this._storage = obj;
  },

  get: function(key) {
    return this.getStorage()[key];
  },

  set: function(key, value) {
    this.getStorage()[key] = value;
  }
});

module.exports = BaseStore;
