import { connectRoutes } from 'redux-first-router';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createHashHistory';

import reducers from './actionReducers';
import routesMap from './routesMap';
import options from './options';

const history = createHistory();
const { reducer, middleware, enhancer } = connectRoutes(history, routesMap, options);

const rootReducer = combineReducers({ location: reducer, ...reducers });
const middlewares = applyMiddleware(thunk, middleware);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(enhancer, middlewares));

export default store;
