import React from 'react';
import { Scene, Router, Actions, Modal } from 'react-native-router-flux';

import Splash from './components/Splash.js';
import LoginForm from './components/LoginForm.js';
import TrackRide from './components/TrackRide.js';
import UserProfileEdit from './components/UserProfileEdit.js';

// import EmployeeList from './components/EmployeeList.js';
// import EmployeeCreate from './components/EmployeeCreate.js';

const RouterComponent = () => (
	<Router sceneStyle={{ paddingTop: 10 }}>
		<Scene key="root" hideNavBar>
			<Scene initial key="auth">
				<Scene hideNavBar key="splash" component={Splash} />
				<Scene hideNavBar key="login" component={LoginForm} title="Please Log In" />
			</Scene>
			<Scene hideNavBar key="main" tabs>
				<Scene hideNavBar tabs initial key="TrackRide" component={TrackRide} />
				<Scene hideNavBar tabs key="Profile" component={UserProfileEdit} />
			</Scene>
		</Scene>
	</Router>
);

export default RouterComponent;

///sceneStyle is a global style tag that will style any scene inside the Router tag
