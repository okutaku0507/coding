var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var DefaultRoute = Router.DefaultRoute;

var CodingApp = require('./components/CodingApp');
var EmptyPage = require('./components/common/EmptyPage');
var NotFoundPage = require('./components/common/NotFoundPage');

var MainLobbyPage = require('./components/common/MainLobbyPage');


var routes = [
  <Route name='app' path='/' handler={CodingApp}>
    <DefaultRoute handler={MainLobbyPage} />
    <NotFoundRoute handler={NotFoundPage} />
    <Route name='not-found' path='/notfound' handler={NotFoundPage} />
  </Route>
];

module.exports = Router.create({
  routes: routes,
  location: null // Router.HistoryLocation
});
