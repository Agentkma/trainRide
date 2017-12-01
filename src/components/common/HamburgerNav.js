import React, { Component } from 'react';
import { Text, TouchableOpacity, TouchableWithFeedback, StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';

class HamburgerNav extends Component {
	constructor(props) {
		super(props);
		this.state = {
			visibleModal: null
		};
	}

	renderButton(text, onPress) {
		return (
			<TouchableOpacity onPress={onPress}>
				<View style={styles.button}>
					<Text>{text}</Text>
				</View>
			</TouchableOpacity>
		);
	}

	renderModalContent() {
		return (
			<TouchableWithFeedback>
				<View style={styles.modalContent}>
					<Text>HOME</Text>
					<Text>PROFILE</Text>
					<Text>LOG OUT</Text>
					{this.renderButton('Close', () => this.setState({ visibleModal: null }))}
				</View>
			</TouchableWithFeedback>
		);
	}

	render() {
		return (
			<View style={styles.container}>
				{this.renderButton('Sliding from the sides', () =>
					this.setState({ visibleModal: 2 })
				)}

				<Modal
					isVisible={this.state.visibleModal === 2}
					animationIn={'slideInLeft'}
					animationOut={'slideOutRight'}
				>
					{this.renderModalContent()}
				</Modal>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	button: {
		backgroundColor: 'lightblue',
		padding: 12,
		margin: 16,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 4,
		borderColor: 'rgba(0, 0, 0, 0.1)'
	},
	modalContent: {
		backgroundColor: 'white',
		padding: 22,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 4,
		borderColor: 'rgba(0, 0, 0, 0.1)'
	},
	bottomModal: {
		justifyContent: 'flex-end',
		margin: 0
	}
});

export { HamburgerNav };
