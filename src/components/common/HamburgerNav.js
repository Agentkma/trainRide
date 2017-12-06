import React, { Component } from 'react';
import { Text, TouchableOpacity, TouchableWithFeedback, StyleSheet, View } from 'react-native';
import CircularMenu from 'react-native-circular-menu';

import { Button } from './Button.js';

class HamburgerNav extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	renderCloseBtn() {
		return <Button>X</Button>;
	}

	render() {
		return (
			<CircularMenu
				closeBtn={this.renderCloseBtn()}
				show={false}
				items={['Track', 'Profile', 'Log Out']}
				position={'topLeft'}
				color={'red'}
			/>
		);
	}
}

export { HamburgerNav };
