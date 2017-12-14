import React, { Component } from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { connect } from 'react-redux';

import { Card, CardSection, Input, Button, Spinner } from './common';

import { emailChanged, passwordChanged, loginUser } from '../actions';

const splashImage = require('../img/splash.jpg');

class LoginForm extends Component {
	onEmailChange(text) {
		//call action creator
		this.props.emailChanged(text);
	}

	onPassworChange(text) {
		//call action creator
		this.props.passwordChanged(text);
	}

	onButtonPress() {
		const { email, password } = this.props;
		this.props.loginUser({ email, password });
	}

	renderErrorMsg() {
		if (this.props.error) {
			return (
				<View style={{ backgroundColor: 'white' }}>
					<Text style={styles.errorTextStyle}>{this.props.error}</Text>
				</View>
			);
		}
	}

	renderLogInBtnOrSpinner() {
		// const { loginBtnContainerStyle } = styles;
		if (this.props.loading) {
			return <Spinner size="large" />;
		}
		return (
			<Button
				style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)' }}
				onPress={this.onButtonPress.bind(this)}
			>
				Log In
			</Button>
		);
	}

	renderFBbtnOrSpinner() {
		// const { loginBtnContainerStyle } = styles;
		if (this.props.loading) {
			return <Spinner size="large" />;
		}
		return <Buttonatom />;
	}

	render() {
		const { imageStyle, loginBtnContainerStyle, cardContainerStyle } = styles;
		return (
			<ImageBackground source={splashImage} style={imageStyle}>
				<Card style={cardContainerStyle}>
					<CardSection>
						<Input
							autoFocus
							label="Email"
							placeholder="email@email.com"
							onChangeText={this.onEmailChange.bind(this)}
						/>
					</CardSection>
					<CardSection>
						<Input
							secureTextEntry
							label="Password"
							placeholder="password"
							onChangeText={this.onPassworChange.bind(this)}
						/>
					</CardSection>
					{this.renderErrorMsg()}
				</Card>
				<View style={loginBtnContainerStyle}>{this.renderLogInBtnOrSpinner()}</View>
				<View style={loginBtnContainerStyle}>{this.renderFBbtnOrSpinner()}</View>
			</ImageBackground>
		);
	}
}

const styles = {
	errorTextStyle: {
		fontSize: 20,
		alignSelf: 'center',
		color: 'red'
	},
	cardContainerStyle: {
		marginTop: '30%'
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
	loginBtnContainerStyle: {
		paddingTop: 10,
		flexDirection: 'row',
		width: '100%',
		backgroundColor: 'transparent',
		justifyContent: 'center',
		alignSelf: 'center'
	}
};

// pass state or state props to component via connect(mapStateToProps)
const mapStateToProps = ({ auth }) => {
	const { email, password, error, loading } = auth;

	return {
		email,
		password,
		error,
		loading
	};
};
//connect action creators { } to LoginForm component
export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser })(LoginForm);
