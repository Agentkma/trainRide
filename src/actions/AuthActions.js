import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
	EMAIL_CHANGED,
	PASSWORD_CHANGED,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAIL,
	USER_LOGIN
} from './types.js';

const provider = new firebase.auth.FacebookAuthProvider();

// firebase.auth().signInWithRedirect(provider);
// firebase
// 	.auth()
// 	.getRedirectResult()
// 	.then((result) => {
// 		if (result.credential) {
// 			// This gives you a Facebook Access Token. You can use it to access the Facebook API.
// 			const token = result.credential.accessToken;
// 			// ...
// 		}
// 		// The signed-in user info.
// 		const user = result.user;
// 	})
// 	.catch((error) => {
// 		// Handle Errors here.
// 		const errorCode = error.code;
// 		const errorMessage = error.message;
// 		// The email of the user's account used.
// 		const email = error.email;
// 		// The firebase.auth.AuthCredential type that was used.
// 		const credential = error.credential;
// 		// ...
// 	});

/*CODE to link an email/password account to Facebook
https://firebase.google.com/docs/auth/web/account-linking
after user sign in with email/password
Prompt the user to sign in with the provider you want to link
auth.currentUser.linkWithRedirect(provider);
After the user signs in, they are redirected back to your page. //Then, you can retrieve the sign-in result by calling //getRedirectResult when your page loads:*/

/*firebase.auth().getRedirectResult().then(function(result) {
  if (result.credential) {
    // Accounts successfully linked.
    var credential = result.credential;
    var user = result.user;
    // ...
  }
}).catch(function(error) {
  // Handle Errors here.
  // ...
});*/

//To sign out a user, call signOut:

/*firebase.auth().signOut().then(function() {
  // Sign-out successful.
}).catch(function(error) {
  // An error happened.
});*/

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
	//user react-native-router-flux to nav to correct screen/scene
	// key property of scene is used as method on Actions
	Actions.main({ type: 'reset' });
};
