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

	renderBtnOrSpinner() {
		if (this.props.loading) {
			return <Spinner size="large" />;
		}
		return <Button onPress={this.onButtonPress.bind(this)}>Log In</Button>;
	}
	//TODO change email and password back to this.props.email  & this.props.password
	render() {
		const {
			headerContainerStyle,
			headerTextStyle,
			subHeaderTextStyle,
			imageStyle,
			buttonContainerStyle
		} = styles;
		return (
			<ImageBackground source={splashImage} style={imageStyle}>
				<Card>
					<CardSection>
						<Input
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
					<CardSection>{this.renderBtnOrSpinner()}</CardSection>
				</Card>
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
