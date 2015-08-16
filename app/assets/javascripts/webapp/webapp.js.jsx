var React = require('react');
window.React = React;
_ = require('underscore');

var router = require('./router')
var RouteActionCreators = require('./actions/RouteActionCreators');
var Modal = require('./components/Modal');

window.Coding = {}
window.Coding.router = router;

module.exports = function() {
  router.run(function (Handler, state) {
    React.render(<Handler/>, document.getElementById('react_area'));
    RouteActionCreators.transition(Handler, state);
  });
}
