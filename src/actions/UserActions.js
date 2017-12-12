import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

import {
	USER_PROFILE_CREATE,
	USER_PROFILE_READ,
	USER_PROFILE_UPDATE,
	USER_RIDE_CREATE,
	USER_RIDE_READ,
	USER_RIDE_DELETE,
	USER_TRACK_UPDATE
} from './types.js';

const DBurl = 'https://shrouded-sea-51852.herokuapp.com';

export const userCreate = ({ name, bio, location }) => dispatch =>
	firebase
		.auth()
		.currentUser.getIdToken(/* forceRefresh */ true)
		.then(userIdToken =>
			fetch(`${DBurl}/user`, {
				method: 'post',
				headers: new Headers({
					Authorization: userIdToken,
					'Content-Type': 'application/json'
				}),
				body: JSON.stringify({ name, bio, location })
			})
		)
		.then(response => {
			console.log('user create response', response);
			Actions.main();
			// Actions.Profile({ type: 'reset' })
			return dispatch({ type: USER_PROFILE_CREATE });
		})
		.catch(error => {
			console.log(error);
		});

export const userProfileUpdate = ({ name, bio, location }) => dispatch =>
	//insert into mongo db

	firebase
		.auth()
		.currentUser.getIdToken(/* forceRefresh */ true)
		.then(userIdToken =>
			fetch(`${DBurl}/user`, {
				method: 'put',
				headers: new Headers({
					Authorization: userIdToken,
					'Content-Type': 'application/json'
				}),
				body: JSON.stringify({ name, bio, location })
			})
		)
		.then(response => {
			console.log('user update response', response);
			Actions.refresh();
			return dispatch({ type: USER_PROFILE_UPDATE });
		})
		.catch(error => {
			console.log(error);
		});

export const userProfileFetch = () => dispatch =>
	//get profile from mongo db
	firebase
		.auth()
		.currentUser.getIdToken(/* forceRefresh */ true)
		.then(userIdToken =>
			fetch(`${DBurl}/user`, {
				method: 'get',
				headers: new Headers({ Authorization: userIdToken })
			})
		)
		.then(response => response.json())
		.then(response => {
			console.log('USER_PROFILE_READ', response);
			return dispatch({
				type: USER_PROFILE_READ,
				payload: response
			});
		})
		.catch(error => {
			console.log(error);
		});

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
}) =>
	//return object or use dispatch to satisfy ReduxThunk rules
	//pass {type:'reset'} to Actions.componentKeyName() so no "Back" arrow appears in header

	dispatch =>
		firebase
			.auth()
			.currentUser.getIdToken(/* forceRefresh */ true)
			.then(userIdToken => {
				//insert into mongo db
				fetch(`${DBurl}/ride`, {
					method: 'post',
					headers: new Headers({
						Authorization: userIdToken,
						'Content-Type': 'application/json'
					}),
					body: JSON.stringify({
						trackTimeTotal,
						trackAvgSpeed,
						trackDistance,
						trackAvgPower,
						trackAvgCadence,
						trackAvgHeartRate,
						title,
						notes
					})
				});
			})
			.then(response => {
				console.log('USER_RIDE_CREATE', response);
				return dispatch({ type: USER_RIDE_CREATE });
			})
			.catch(error => {
				console.log(error);
			});

export const userRideFetch = () => dispatch =>
	//get rides from mongo db
	firebase
		.auth()
		.currentUser.getIdToken(/* forceRefresh */ true)
		.then(userIdToken =>
			fetch(`${DBurl}/ride`, {
				method: 'get',
				headers: new Headers({ Authorization: userIdToken })
			})
		)
		.then(response => response.json())
		.then(response => {
			console.log('USER_RIDE_READ', response);
			return dispatch({
				type: USER_RIDE_READ,
				payload: response
			});
		})
		.catch(error => {
			console.log(error);
		});

export const userRideDelete = ({ _id }) => dispatch =>
	firebase
		.auth()
		.currentUser.getIdToken(/* forceRefresh */ true)
		.then(userIdToken => {
			//delete from  mongo db
			fetch(`${DBurl}/user/${_id}`, {
				method: 'delete',
				headers: new Headers({
					Authorization: userIdToken,
					'Content-Type': 'application/json'
				})
			});
		})
		.then(response => {
			console.log('USER_RIDE_DELETE', response);
			Actions.main();
			// Actions.Profile({ type: 'reset' })
			return dispatch({ type: USER_RIDE_DELETE });
		})
		.catch(error => {
			console.log(error);
		});

export const userTrackUpdate = ({ prop, value }) => ({
	type: USER_TRACK_UPDATE,
	payload: { prop, value }
});
