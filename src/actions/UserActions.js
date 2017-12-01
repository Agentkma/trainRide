import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

import {
	USER_UDATE,
	USER_CREATE,
	USER_RIDE_FETCH_SUCCESS,
	USER_RIDE_SAVE_SUCCESS
} from './types.js';

export const userUpdate = ({ prop, value }) => ({
	type: USER_UDATE,
	payload: { prop, value }
});

export const userCreate = ({ name, phone, shift }) => {
	const { currentUser } = firebase.auth();
	//return object to satisfy ReduxThunk rules
	//pass {type:'reset'} to employeList() so no "Back" arrow appears in header
	return dispatch => {
		firebase
			.database()
			.ref(`/users/${currentUser.uid}/employees`)
			.push({ name, phone, shift })
			.then(() => {
				dispatch({ type: USER_CREATE });
				Actions.main({ type: 'reset' });
			});
	};
};

export const userRideSave = ({ name, phone, shift, uid }) => {
	const { currentUser } = firebase.auth();

	return dispatch => {
		// firebase
		// 	.database()
		// 	.ref(`/users/${currentUser.uid}/employees/${uid}`)
		// 	.set({ name, phone, shift })
		// 	.then(() => {
		// 		dispatch({ type: USER_RIDE_SAVE_SUCCESS });
		// 		Actions.employeeList({ type: 'reset' });
		// 	});
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
