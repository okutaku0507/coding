var keyMirror = require('keymirror');

var Root = window.location.origin;

var WebSocketRoot;

if (Root === 'http://localhost:3000') {
  WebSocketRoot = 'http://localhost:3000';
} else if (Root === 'https://coding.herokuapp.com' || Root === 'http://coding.herokuapp.com') {
  WebSocketRoot = 'https://coding.herokuapp.com';
} else if (Root === 'http://coding.com') {
  WebSocketRoot = 'http://coding.com';
}

module.exports = {

  APIEndpoints: {
    CODES:  Root + '/codes',
    LOGOUT: Root + '/sign_out'
  },

  WebSocketEndpoint: WebSocketRoot,

  PayloadSources: keyMirror({
    APP_SERVER_ACTION: null,
    SOCKET_SERVER_ACTION: null,
    VIEW_ACTION: null
  }),

  ActionTypes: keyMirror({
    LOAD_INITIAL_DATA: null,
    RECEIVE_INITIAL_DATA: null,

    // Session
    RECEIVE_CODE: null,
    LOGOUT: null,
    LOGGED_OUT: null,

    // Socket
    CONNECT_SOCKET: null,
    SOCKET_CONNECTED: null,
    JOIN_PROJECT: null,
    JOINED_PROJECT: null,

    // Routes
    TRANSITION: null,
    REDIRECT: null,

  })
};
