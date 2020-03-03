import React from 'react';
import {
	Router,
	Route,
	Switch,
	Link
} from 'react-router-dom';
import Machines from './Machines';
import Machine from './Machine';
import WebsocketLoader from './WebsocketLoader';
import './App.css';
import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';

import PropTypes from 'prop-types';

const store = createStore(rootReducer, {}, applyMiddleware(ReduxThunk));
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

function App (props) {

	return (
		<Provider store={store}>
			<WebsocketLoader />
			<Router history={history} >
				<div className='App'>
					<header className='App-header'>
						<img alt='logo' height='272' width='800' src='https://i.imgur.com/jcvsFKh.png' />
					</header>

					<nav className='App-nav'>
						<Link to='/'>Home</Link>
						<Link to='/machines'>Machines</Link>
					</nav>

					<Switch>
						<Route exact path='/machines'>
							<Machines history={history} />
						</Route>
						<Route path='/machines/:id'>
							<Machine history={history} />
						</Route>
					</Switch>
				</div>
			</Router>
		</Provider>
	);
}

App.propTypes = {
	getMachines: PropTypes.array
};


export default App;
