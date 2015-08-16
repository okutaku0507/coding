var React = require('react');
var RouteHandler = require('react-router').RouteHandler;
var _ = require('underscore');

var InitialActionCreators = require('../actions/InitialActionCreators');
var InitialStore = require('../stores/InitialStore');
var SessionStore = require('../stores/SessionStore');
var CodingAppViewStore = require('../stores/CodingAppViewStore');
var Root = window.location.origin;
var WebSocketRoot;
if (Root === 'http://localhost:3000') {
  WebSocketRoot = 'localhost:3000';
} else if (Root === 'https://sharing-code-in-realtime.herokuapp.com' || Root === 'http://sharing-code-in-realtime.herokuapp.com') {
  WebSocketRoot = 'sharing-code-in-realtime.herokuapp.com';
} else if (Root === '') {
  WebSocketRoot = '';
}
var WsRails = new WebSocketRails(WebSocketRoot + "/websocket");
var owner = 0;

var CodingApp = React.createClass({

  STORES: [InitialStore, SessionStore],

  hasAppInitialized: false,

  getStateFromStores: function() {
    return {
      hasAppInitialized: this.hasAppInitialized,
      code: SessionStore.getCode(),
      notificationMessages: CodingAppViewStore.getNotificationMessages()
    }
  },

  getInitialState: function() {
    return this.getStateFromStores();
  },

  initializeStateWithStores: function() {
    var _this = this;
    var ace_editor_value = '';
    InitialActionCreators.loadInitialData();
    $('#react_area').on('keyup', '.ace_editor', function(e){
      ace_editor_value = '';
      $('div.ace_line').each(function(index) {
        if (index === 0) {
          ace_editor_value += $(this).text();
        } else {
          ace_editor_value += "\n" + $(this).text();
        }
      });
      _this.setState({code: {code: ace_editor_value}});
      owner = 1;
      WsRails.trigger('websocket_code', {id: SessionStore.getCodeId(), code: ace_editor_value});
      e.preventDefault();
      e.stopPropagation();
    });
  },

  componentDidMount: function() {
    var _this = this;
    this.STORES.forEach(function(store) {
      store.addChangeListener(_this._onChange);
    });
    CodingAppViewStore.addChangeListener(this._onChange);
    this.initializeStateWithStores();
    WsRails.bind('websocket_code', function(hash){
      var recieve_id = parseInt(hash.id);
      var recieve_code = hash.code;
      if(recieve_id === SessionStore.getCodeId() && owner === 0) {
        _this.setState({code: {code: recieve_code}}, function(){});
        console.log('recieve');
      }
      owner = 0;
    })
  },

  componentWillUnmount: function() {
    var _this = this;
    this.STORES.forEach(function(store) {
      store.removeChangeListener(_this._onChange);
    });
    CodingAppViewStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    var _this = this;
    if (_.all(this.STORES, function(store) { return store.hasInitialized();})) {
      _this.hasAppInitialized = true;
    }
    this.setState(this.getStateFromStores());
  },

  _codeChange: function(e) {
    owner = 1;
    this.setState({code: {code: e.target.value}});
    WsRails.trigger('websocket_code', {id: SessionStore.getCodeId(), code: e.target.value});
    e.preventDefault();
    e.stopPropagation();
  },

  componentDidUpdate: function() {
  },

  render: function() {
    var code = SessionStore.getCode();
    var defaultValue = this.state.code.code || code.code || "puts 'Hello, World.'";
    return (
      <textarea id='my-code-area' style={{width: '100%', height: '90%'}}
        value={this.state.code.code} onChange={this._codeChange}>{this.state.code.code}</textarea>
    );
  }

});

module.exports = CodingApp;
