import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

import {
	USER_PROFILE,
	USER_RIDE_CREATE,
	USER_RIDE_FETCH_SUCCESS,
	USER_RIDE_SAVE_SUCCESS,
	USER_TRACK_UPDATE
} from './types.js';

export const userUpdate = ({ prop, value }) => ({
	type: USER_PROFILE,
	payload: { prop, value }
});

//TODO COMPLETE RIDE CREATION action creator
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
	const { currentUser } = firebase.auth();
	//${currentUser.uid}
	//return object to satisfy ReduxThunk rules
	//pass {type:'reset'} to Actions.componentKeyName() so no "Back" arrow appears in header
	return dispatch => {
		//insert into mongo db
	};
};

export const userRideFetch = () => {
	const { currentUser } = firebase.auth();
	return dispatch => {
		// firebase
		// 	.database()
		// 	.ref(`/users/${currentUser.uid}/employees`)
		// 	.on('value', snapshot => {
		// 		console.log('snapshot', snapshot);
		// 		dispatch({ type: USER_RIDE_FETCH_SUCCESS, payload: snapshot.val() });
		// 	});
	};
};

export const userRideDelete = ({ uid }) => {
	const { currentUser } = firebase.auth();

	return () => {
		// firebase
		// 	.database()
		// 	.ref(`/users/${currentUser.uid}/employees/${uid}`)
		// 	.remove()
		// 	.then(() => {
		// 		Actions.employeeList({ type: 'reset' });
		// 	});
	};
};

export const userTrackUpdate = ({ prop, value }) => ({
	type: USER_TRACK_UPDATE,
	payload: { prop, value }
});
