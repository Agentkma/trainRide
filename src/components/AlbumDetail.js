//Import libraries for making component
import React from 'react';
import { Text, View, Image, Linking } from 'react-native';

//Import child components
import Card from './Card.js';
import CardSection from './CardSection.js';
import Button from './Button.js';

const AlbumDetail = ({ album }) => {
	// destructure album object to get indiv consts
	const { thumbnail_image, title, artist, image, url } = album;
	// destructure thumbnailStyle, headerContentStyle from style object
	const {
		thumbnailStyle,
		headerContentStyle,
		thumbnailContainerStyle,
		headerTextStyle,
		imageStyle
	} = styles;

	return (
		<Card>
			<CardSection>
				<View style={thumbnailContainerStyle}>
					<Image source={{ uri: thumbnail_image }} style={thumbnailStyle} />
				</View>
				<View style={headerContentStyle}>
					<Text style={headerTextStyle}>{title}</Text>
					<Text>{artist}</Text>
				</View>
				<View />
			</CardSection>
			<CardSection>
				<Image source={{ uri: image }} style={imageStyle} />
			</CardSection>
			<Button onPress={() => Linking.openURL(url)}>Buy Now!</Button>
			<CardSection />
		</Card>
	);
};

const styles = {
	headerContentStyle: {
		flexDirection: 'column',
		justifyContent: 'space-around'
	},
	headerTextStyle: {
		fontSize: 18
	},
	thumbnailStyle: {
		width: 50,
		height: 50
	},
	thumbnailContainerStyle: {
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: 10,
		marginRight: 10
	},
	imageStyle: {
		height: 300,
		flex: 1,
		width: null
	}
};

export default AlbumDetail;
