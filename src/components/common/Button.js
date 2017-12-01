//Import libraries for making component
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ onPress, children, style }) => {
	const { buttonStyle, textStyle } = styles;
	/* Use TouchableOpacity with onPress method to handle click events */
	return (
		<TouchableOpacity onPress={onPress} style={[buttonStyle, style]}>
			<Text style={textStyle}>{children}</Text>
		</TouchableOpacity>
	);
};

const styles = {
	buttonStyle: {
		flex: 1,
		alignSelf: 'stretch',
		borderRadius: 5,
		borderWidth: 1,
		backgroundColor: '#fff',
		borderColor: 'red',
		marginLeft: 5,
		marginRight: 5
	},
	textStyle: {
		alignSelf: 'center',
		color: 'red',
		fontSize: 16,
		fontWeight: '600',
		paddingTop: 10,
		paddingBottom: 10
	}
};
/*  MAKE component available to other parts of the App. MUST export object in lieu of default when combing all common components in common/index.js file .  */
export { Button };
