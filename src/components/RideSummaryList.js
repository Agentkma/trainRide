//Import libraries for making component
import React, { Component } from 'react';
import { FlatList } from 'react-native';

//Axios used for http request related tasks
import Axios from 'axios';

//Import child components
import ListItem from './common';

//create component
//props holds values passed in from parent App / root component
class RideSummaryList extends Component {
	constructor(props) {
		super(props);
		//set initial state/rides array is empty
		this.state = {
			rides: []
		};
	}

	//componentWillMount method will run as soon as component loads
	componentWillMount() {}

	renderRideSummaries() {
		return this.props.rides.map(album => <ListItem key={album.title} album={album} />);
	}

	render() {
		return <FlatList>{this.renderRideSummaries()}</FlatList>;
	}
}

export default RideSummaryList;
