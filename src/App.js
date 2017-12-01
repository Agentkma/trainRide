import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
//redux-thunk is middleware
import ReduxThunk from 'redux-thunk';

import reducers from './reducers';
import Router from './Router.js';

class App extends Component {
	componentWillMount() {
		// Initialize Firebase
		const config = {
			apiKey: 'AIzaSyDgK6P9sOc6FwQU9uzLeYFgaqAtEPalBcs',
			authDomain: 'trainride-5d227.firebaseapp.com',
			databaseURL: 'https://trainride-5d227.firebaseio.com',
			projectId: 'trainride-5d227',
			storageBucket: 'trainride-5d227.appspot.com',
			messagingSenderId: '419395062547'
		};
		firebase.initializeApp(config);
	}

	render() {
		//applyMiddleware(ReduxThunk) is a store 'enhancer'
		const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

		return (
			<Provider store={store}>
				<Router />
			</Provider>
		);
	}
}

export default App;
