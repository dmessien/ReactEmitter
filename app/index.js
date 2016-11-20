// main.js
var React = require('react');
var ReactDOM = require('react-dom');

import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';
// var ReactRouter = require('react-router');
// var Router = ReactRouter.Router;
// var Route = ReactRouter.Route;
// var IndexRoute = ReactRouter.IndexRoute;

import App from './components/App';
import Search from './components/Search/Search';
import Comments from './components/Comments/Comments';
import NotFound from './components/Error/NotFound';

//var Actions = require('./dispatcher/Actions');

var router = <Router history={browserHistory}>
    <Route path="/" component={App}>
        <IndexRoute component={Search}/>
        <Route path="/comments" component={Comments} />
        <Route path="*" component={NotFound}/>
    </Route>
</Router>;

ReactDOM.render(
    router,
    document.getElementById("main")
);