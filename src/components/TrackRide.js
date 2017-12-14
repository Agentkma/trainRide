import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import { Actions } from 'react-native-router-flux';
// import _ from 'lodash';

import { userTrackUpdate, userProfileFetch, userRideFetch } from '../actions';
import { Card, CardSection, Button } from './common';

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = 0.0421;

class TrackRide extends Component {
	constructor(props) {
		super(props);
		this.state = {
			elapsedTime: 0,
			previousTime: 0,
			timeRunning: false,
			formattedTime: '00.00.00',
			formattedDistance: '0.0',
			currentRegion: {
				latitude: 39.734012,
				longitude: -104.992674,
				latitudeDelta: LATITUDE_DELTA,
				longitudeDelta: LONGITUDE_DELTA
			},
			marker: {
				latlng: {
					latitude: 0,
					longitude: 0
				}
			}
		};
	}

	// lifecycle events

	componentDidMount() {
		this.interval = setInterval(this.onTick.bind(this));
		navigator.geolocation.getCurrentPosition(
			position => {
				this.setState({
					currentRegion: {
						latitude: position.coords.latitude,
						longitude: position.coords.longitude,
						latitudeDelta: LATITUDE_DELTA,
						longitudeDelta: LONGITUDE_DELTA
					},
					marker: {
						latlng: {
							latitude: position.coords.latitude,
							longitude: position.coords.longitude
						}
					}
				});
				this.forceUpdate();
			},
			error => alert(error.message),
			{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
		);
		this.watchID = navigator.geolocation.watchPosition(position => {
			this.setState({
				currentRegion: {
					latitude: position.coords.latitude,
					longitude: position.coords.longitude,
					latitudeDelta: LATITUDE_DELTA,
					longitudeDelta: LONGITUDE_DELTA
				}
			});
		});

		this.props.userProfileFetch();
		this.props.userRideFetch();
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	onTick() {
		if (this.state.timeRunning) {
			const now = Date.now();
			this.setState({
				elapsedTime: this.state.elapsedTime + (now - this.state.previousTime),
				previousTime: Date.now(),
				formattedTime: this.msToTime.call(this)
			});
		}
	}

	onStart() {
		this.onTick.bind(this);
		this.setState({
			timeRunning: true,
			previousTime: Date.now()
		});
	}
	onPause() {
		this.onTick.bind(this);
		this.setState({
			timeRunning: false,
			previousTime: Date.now()
		});
	}
	onFinish() {
		// call action creator to save elapsedTime to to totalTime
		this.props.userTrackUpdate({ trackTimeTotal: this.state.formattedTime });
		this.props.userTrackUpdate({ trackDistance: this.state.formattedDistance });
		Actions.RideSummary();
	}

	msToTime() {
		const time = Math.floor(this.state.elapsedTime / 1000);
		let seconds = Math.floor(time % 60);
		let minutes = Math.floor((time / 60) % 60);
		let hours = Math.floor((time / (60 * 60)) % 24);

		hours = hours < 10 ? `0${hours}` : hours;
		minutes = minutes < 10 ? `0${minutes}` : minutes;
		seconds = seconds < 10 ? `0${seconds}` : seconds;

		return `${hours}:${minutes}:${seconds}`;
	}

	updateLatLng() {
		return {
			latitude: this.state.marker.latlng.latitude,
			longitude: this.state.marker.latlng.longitude
		};
	}

	//TODO  method to track/and format Distance
	updateDistance() {}

	renderBtnStartOrPause() {
		return this.state.timeRunning ? (
			<Button onPress={this.onPause.bind(this)}>Pause</Button>
		) : (
			<Button onPress={this.onStart.bind(this)}>Start</Button>
		);
	}

	render() {
		const {
			parentContainerStyle,
			statContainerStyle,
			cardMapContainerStyle,
			headerTextStyle,
			textStyle,
			mapViewStyle,
			buttonContainerStyle
		} = styles;

		return (
			<View style={parentContainerStyle}>
				<Card style={{ marginTop: 0, flex: 3 }}>
					<CardSection style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
						<View style={statContainerStyle}>
							<Text style={headerTextStyle}>Time</Text>
							<Text style={textStyle}>{this.state.formattedTime}</Text>
						</View>
						<View style={statContainerStyle}>
							<Text style={headerTextStyle}>Distance</Text>
							<Text style={textStyle}>{this.state.formattedDistance}</Text>
						</View>
					</CardSection>
					<CardSection style={cardMapContainerStyle}>
						<View style={{ flex: 1 }}>
							<MapView
								style={mapViewStyle}
								showsUserLocation
								followsUserLocation
								showsMyLocationButton
								loadingEnabled
								loadingIndicatorColor={'black'}
								loadingBackgroundColor={'lightblue'}
								initialRegion={this.state.currentRegion}
							>
								<MapView.Marker
									key={Date.now()}
									coordinate={this.updateLatLng.call(this)}
									title={'You are Here'}
									description={'Current Location'}
								/>
							</MapView>
						</View>
					</CardSection>
					<CardSection style={buttonContainerStyle}>
						{this.renderBtnStartOrPause.call(this)}
						<Button onPress={this.onFinish.bind(this)}>FINISH</Button>
					</CardSection>
				</Card>
			</View>
		);
	}
}

const styles = {
	parentContainerStyle: {
		flex: 1
	},
	cardMapContainerStyle: {
		flex: 3
	},
	statContainerStyle: {
		flex: 1,
		marginLeft: 5,
		marginRight: 5,
		borderColor: 'red',
		borderWidth: 1,
		borderRadius: 5,
		justifyContent: 'space-between'
	},
	textStyle: {
		lineHeight: 16,
		fontSize: 18,
		alignSelf: 'center',
		fontWeight: '400',
		paddingTop: 10,
		paddingBottom: 10
	},
	headerTextStyle: {
		fontSize: 22,
		fontWeight: '600',
		alignSelf: 'center',
		paddingTop: 5
	},
	mapViewStyle: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0
	},
	buttonContainerStyle: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	}
};

// state or destructured state of {userTrackRide}  comes from key names from reducers/index.js file

const mapStateToProps = ({ userTrackRide }) => {
	const {
		trackTimeTotal,
		trackAvgSpeed,
		trackDistance,
		trackAvgPower,
		trackAvgCadence,
		trackAvgHeartRate
	} = userTrackRide;

	return {
		trackTimeTotal,
		trackAvgSpeed,
		trackDistance,
		trackAvgPower,
		trackAvgCadence,
		trackAvgHeartRate
	};
};

export default connect(mapStateToProps, { userTrackUpdate, userProfileFetch, userRideFetch })(
	TrackRide
);
