import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
//Axios used for http request related tasks
import Axios from 'axios';

import {
	USER_PROFILE_CREATE,
	USER_PROFILE_READ,
	USER_PROFILE_UPDATE,
	USER_RIDE_CREATE,
	USER_RIDE_READ,
	USER_TRACK_UPDATE
} from './types.js';
///TODO add USER_PROFILE_FETCH action creator and call it when user
//updates profile....when they navigate away
// TODO call USER_RIDE_FETCH_SUCCESS when user log's in

const dbURL = 'https://shrouded-sea-51852.herokuapp.com';

export const userCreate = ({ name, bio, location }) => {
	const userId = firebase.auth().currentUser.getIdToken(/* forceRefresh */ true);
	console.log('user token', userId);

	return dispatch => {
		//insert into mongo db
		Axios.post({
			method: 'post',
			url: `${dbURL}/user`,
			data: {
				name,
				bio,
				location
			},
			auth: {
				userId
			}
		})
			.then(response => {
				console.log(response);
				dispatch({ type: USER_PROFILE_CREATE });
				Actions.main();
				// Actions.Profile({ type: 'reset' })
			})
			.catch(error => {
				console.log(error);
			});
	};
};

export const userProfileUpdate = ({ name, bio, location }) => {
	const userId = firebase.auth().currentUser.getIdToken(/* forceRefresh */ true);
	console.log('user token', userId);

	return dispatch => {
		//insert into mongo db
		Axios.put({
			method: 'post',
			url: `${dbURL}/user`,
			data: {
				name,
				bio,
				location
			},
			auth: {
				userId
			}
		})
			.then(response => {
				console.log(response);
				dispatch({ type: USER_PROFILE_UPDATE });
				Actions.main();
				// Actions.Profile({ type: 'reset' })
			})
			.catch(error => {
				console.log(error);
			});
	};
};

export const userProfileFetch = () => {
	const userId = firebase.auth().currentUser.getIdToken(/* forceRefresh */ true);
	return dispatch => {
		//get profile from mongo db

		Axios.get({
			method: 'get',
			url: `${dbURL}/user`,
			auth: {
				userId
			}
		})
			.then(response => {
				console.log(response);
				dispatch({
					type: USER_PROFILE_READ,
					payload: response.data
				});
			})
			.catch(error => {
				console.log(error);
			});
	};
};

export const userUpdate = ({ prop, value }) => ({
	type: USER_PROFILE_UPDATE,
	payload: { prop, value }
});

export const userRideCreate = ({
	trackTimeTotal,
	trackAvgSpeed,
	trackDistance,
	trackAvgPower,
	trackAvgCadence,
	trackAvgHeartRate,
	title,
	notes
}) => {
	const userId = firebase.auth().currentUser.getIdToken(/* forceRefresh */ true);

	//return object or use dispatch to satisfy ReduxThunk rules
	//pass {type:'reset'} to Actions.componentKeyName() so no "Back" arrow appears in header

	return dispatch => {
		//insert into mongo db

		Axios.post({
			method: 'post',
			url: `${dbURL}/user`,
			data: {
				trackTimeTotal,
				trackAvgSpeed,
				trackDistance,
				trackAvgPower,
				trackAvgCadence,
				trackAvgHeartRate,
				title,
				notes
			},
			auth: {
				userId
			}
		})
			.then(response => {
				console.log(response);
				dispatch({ type: USER_RIDE_CREATE });
				Actions.main();
				// Actions.Profile({ type: 'reset' })
			})
			.catch(error => {
				console.log(error);
			});
	};
};

export const userRideFetch = () => {
	const userId = firebase.auth().currentUser.getIdToken(/* forceRefresh */ true);
	return dispatch => {
		//get rides from mongo db

		Axios.get({
			method: 'get',
			url: `${dbURL}/ride`,
			auth: {
				userId
			}
		})
			.then(response => {
				//TODO response is array of bike ride objects
				console.log(response);
				dispatch({
					type: USER_RIDE_READ,
					payload: response.data
				});
			})
			.catch(error => {
				console.log(error);
			});
	};
};

export const userRideDelete = ({ _id }) => {
	const userId = firebase.auth().currentUser.getIdToken(/* forceRefresh */ true);

	return dispatch => {
		//delete from  mongo db

		Axios.delete({
			method: 'post',
			url: `${dbURL}/user/`,
			params: {
				id: _id
			},
			auth: {
				userId
			}
		})
			.then(response => {
				console.log(response);
				dispatch({ type: USER_RIDE_CREATE });
				Actions.main();
				// Actions.Profile({ type: 'reset' })
			})
			.catch(error => {
				console.log(error);
			});
	};
};

export const userTrackUpdate = ({ prop, value }) => ({
	type: USER_TRACK_UPDATE,
	payload: { prop, value }
});
