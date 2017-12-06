import React from 'react';
import { Scene, Router, Actions, Modal } from 'react-native-router-flux';

import Splash from './components/Splash.js';
import LoginForm from './components/LoginForm.js';
import TrackRide from './components/TrackRide.js';
import UserProfileEdit from './components/UserProfileEdit.js';
import RideSummaryData from './components/RideSummaryData.js';

// import EmployeeList from './components/EmployeeList.js';
// import EmployeeCreate from './components/EmployeeCreate.js';

const RouterComponent = () => (
	<Router sceneStyle={{ paddingTop: 10 }}>
		<Scene key="root" hideNavBar>
			<Scene initial key="auth">
				<Scene hideNavBar key="splash" component={Splash} />
				<Scene hideNavBar key="login" component={LoginForm} title="Please Log In" />
			</Scene>
			<Scene key="main">
				<Scene
					initial
					title="Track Your Ride"
					key="TrackRide"
					component={TrackRide}
					rightTitle="Profile"
					onRight={() => Actions.Profile()}
				/>
				<Scene
					initial
					title="Ride Summary"
					key="RideSummary"
					component={RideSummaryData}
					rightTitle="Profile"
					onRight={() => Actions.Profile()}
				/>

				<Scene
					title="Profile"
					key="Profile"
					component={UserProfileEdit}
					leftTitle="Track"
					onLeft={() => Actions.TrackRide()}
				/>
			</Scene>
		</Scene>
	</Router>
);

export default RouterComponent;

///sceneStyle is a global style tag that will style any scene inside the Router tag
