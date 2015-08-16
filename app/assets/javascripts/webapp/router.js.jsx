var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var DefaultRoute = Router.DefaultRoute;

var CodingApp = require('./components/CodingApp');


var routes = [
  <Route name='app' path='/' handler={CodingApp}>
  </Route>
];

module.exports = Router.create({
  routes: routes,
  location: null // Router.HistoryLocation
});
