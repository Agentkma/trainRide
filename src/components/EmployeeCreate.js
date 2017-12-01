import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Card, CardSection, Button } from './common';
import { employeeUpdate, employeeCreate } from '../actions';
import EmployeeForm from './EmployeeForm';

class EmployeeCreate extends Component {
	onButtonPress() {
		const { name, phone, shift } = this.props;

		//call action creator with above variables
		this.props.employeeCreate({ name, phone, shift: shift || 'Monday' });
	}

	render() {
		return (
			<Card>
				<EmployeeForm {...this.props} />
				<CardSection>
					<Button onPress={this.onButtonPress.bind(this)}>Create</Button>
				</CardSection>
			</Card>
		);
	}
}

// state or destructured state of {employeeForm}  comes from key names from reducers/index.js file
const mapStateToProps = ({ employeeForm }) => {
	const { name, phone, shift } = employeeForm;

	return {
		name,
		phone,
		shift
	};
};

export default connect(mapStateToProps, { employeeUpdate, employeeCreate })(EmployeeCreate);
