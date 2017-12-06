//Import libraries for making component
import React from 'react';
import { Text, View, ImageBackground } from 'react-native';
import { Actions } from 'react-native-router-flux';

//Import child components
import { Card, CardSection, Button } from './common';

const splashImage = require('../img/splash.jpg');

const Splash = () => {
	// destructure splashImageStyle, imageStyle from style object
	const {
		buttonContainerStyle,
		imageStyle,
		headerContainerStyle,
		headerTextStyle,
		subHeaderTextStyle
	} = styles;
	// TODO  add opacity to button...below not working

	return (
		<ImageBackground source={splashImage} style={imageStyle}>
			<View style={headerContainerStyle}>
				<Text style={headerTextStyle}>terraGo</Text>
				<Text style={subHeaderTextStyle}>easy training analytics</Text>
			</View>
			<View style={buttonContainerStyle}>
				<Button
					style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)' }}
					onPress={() => Actions.login()}
				>
					Get Started!
				</Button>
			</View>
		</ImageBackground>
	);
};

const styles = {
	headerContainerStyle: {
		paddingTop: '10%',
		paddingBottom: '10%',
		flexDirection: 'column',
		justifyContent: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.85)'
	},
	headerTextStyle: {
		fontSize: 36,
		fontWeight: '600',
		color: 'red',
		flexDirection: 'row',
		alignSelf: 'center'
	},
	subHeaderTextStyle: {
		fontSize: 24,
		fontWeight: '200',
		color: 'red',
		flexDirection: 'row',
		alignSelf: 'center'
	},
	imageStyle: {
		height: null,
		flex: 1,
		width: null,
		alignSelf: 'stretch'
	},
	buttonContainerStyle: {
		paddingTop: '85%',
		flexDirection: 'row',
		width: '50%',
		backgroundColor: 'transparent',
		justifyContent: 'center',
		alignSelf: 'center'
	}
};

export default Splash;
