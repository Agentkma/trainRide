//Import libraries for making component
import React from 'react';
import { View } from 'react-native';

// CardSection Component for sections of the Card container styling/ to be reused
//style = { [ xxx, yyy ]} if this CardSection is used and style prop added, then the prop.styles will overide the containerStyle
const CardSection = props => {
	const { containerStyle } = styles;
	return <View style={[containerStyle, props.style]}>{props.children}</View>;
};

const styles = {
	containerStyle: {
		borderBottomWidth: 1,
		padding: 5,
		backgroundColor: '#fff',
		justifyContent: 'flex-start',
		flexDirection: 'row',
		borderColor: '#ddd',
		position: 'relative'
	}
};

export { CardSection };
