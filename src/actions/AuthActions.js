import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
	EMAIL_CHANGED,
	PASSWORD_CHANGED,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAIL,
	USER_LOGIN
} from './types.js';

export const emailChanged = text => ({
	type: EMAIL_CHANGED,
	payload: text
});

export const passwordChanged = text => ({
	type: PASSWORD_CHANGED,
	payload: text
});

// with ReduxThunk this action creator is now returning a function
//need this for asynchronous calls like http/ajax
export const loginUser = ({ email, password }) => dispatch => {
	dispatch({ type: USER_LOGIN });

	firebase
		.auth()
		.signInWithEmailAndPassword(email, password)
		.then(user => loginUserSuccess(dispatch, user))
		.catch(error => {
			console.log(error);

			firebase
				.auth()
				.createUserWithEmailAndPassword(email, password)
				.then(user => loginUserSuccess(dispatch, user))
				.catch(err => loginUserFailure(dispatch, err));
		});
};

// HELPER FUNCTIONS
const loginUserFailure = (dispatch, err) => {
	console.log(err);
	dispatch({ type: USER_LOGIN_FAIL });
};

const loginUserSuccess = (dispatch, user) => {
	dispatch({
		type: USER_LOGIN_SUCCESS,
		payload: user
	});
	const userId = firebase.auth().currentUser.getIdToken(/* forceRefresh */ true);
	console.log('user token', userId);

	//user react-native-router-flux to nav to correct screen/scene
	// key property of scene is used as method on Actions
	Actions.TrackRide();
};
