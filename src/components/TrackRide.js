import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import { Actions } from 'react-native-router-flux';
// import _ from 'lodash';

import { userTrackUpdate } from '../actions';
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
	// componentDidMount() {
	// 	this.interval = setInterval(this.onTick.bind(this));
	// }

	componentDidMount() {
		this.interval = setInterval(this.onTick.bind(this));
		navigator.geolocation.getCurrentPosition(
			position => {
				console.log(position);
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
				console.log(this.state.marker.latlng);
			},
			error => alert(error.message),
			{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
		);
		this.watchID = navigator.geolocation.watchPosition(position => {
			console.log(position);
			this.setState({
				currentRegion: {
					latitude: position.coords.latitude,
					longitude: position.coords.longitude,
					latitudeDelta: LATITUDE_DELTA,
					longitudeDelta: LONGITUDE_DELTA
				}
			});
		});
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
		console.log(this.state.marker.latlng);
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
		const { statContainerStyle, textStyle, mapViewStyle } = styles;

		return (
			<View>
				<Card style={{ marginTop: 0 }}>
					<CardSection style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
						<View style={statContainerStyle}>
							<Text style={textStyle}>Time</Text>
							<Text style={textStyle}>{this.state.formattedTime}</Text>
						</View>
						<View style={statContainerStyle}>
							<Text style={textStyle}>Distance</Text>
							<Text style={textStyle}>{this.state.formattedDistance}</Text>
						</View>
					</CardSection>
					<CardSection>
						<View style={{ flex: 1, height: 375 }}>
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
					<CardSection
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between'
						}}
					>
						{this.renderBtnStartOrPause.call(this)}
						<Button onPress={this.onFinish.bind(this)}>FINISH</Button>
					</CardSection>
				</Card>
			</View>
		);
	}
}

const styles = {
	statContainerStyle: {
		width: '47.5%',
		borderColor: 'red',
		borderWidth: 1,
		borderRadius: 5
	},
	textStyle: {
		lineHeight: 20,
		fontSize: 20,
		alignSelf: 'center',
		fontWeight: '600',
		paddingTop: 10,
		paddingBottom: 10
	},
	mapViewStyle: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0
	}
};

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

export default connect(mapStateToProps, { userTrackUpdate })(TrackRide);
