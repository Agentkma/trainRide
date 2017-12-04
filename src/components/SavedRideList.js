import React, { Component } from 'react';
import { ListView, Text } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

import { userRideFetch } from '../actions';
import ListItem from './ListItem.js';

class SavedRideList extends Component {
	componentWillMount() {
		this.props.userRideFetch();
		this.createDataSource(this.props);
	}

	componentWillReceiveProps(nextProps) {
		this.createDataSource(nextProps);
	}

	createDataSource({ rides }) {
		const ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2
		});
		//TODO NOT GETTING EMPLOYEES FROM FIREBASE
		console.log('rides', rides);
		this.dataSource = ds.cloneWithRows(rides);
	}

	renderRow(rides) {
		return <ListItem rides={rides} />;
	}

	render() {
		return (
			<ListView enableEmptySections dataSource={this.dataSource} renderRow={this.renderRow} />
		);
	}
}

const mapStateToProps = state => {
	const rides = _.map(state.rides, (val, uid) => ({ ...val, uid }));

	return { rides };
};

export default connect(mapStateToProps, { userRideFetch })(SavedRideList);
