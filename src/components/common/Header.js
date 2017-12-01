//Import libraries for making component
import React from 'react';
import { Text, View } from 'react-native';

//create component (this is a Functional Component)
//props holds values passed in from parent App / root component
const Header = props => {
	const { textStyle, viewStyle } = styles;

	return (
		<View style={viewStyle}>
			<Text style={textStyle}>{props.headerText}</Text>
		</View>
	);
};

// Component Styles
const styles = {
	viewStyle: {
		backgroundColor: '#F8F8F8',
		justifyContent: 'center',
		alignItems: 'center',
		height: 60,
		paddingTop: 15,
		borderBottomColor: '#000',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2
	},
	textStyle: {
		fontSize: 20
	}
};

// make component available to other parts of app
export { Header };
