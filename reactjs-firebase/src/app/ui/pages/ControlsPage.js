import React, {View} from 'react';
import Knob from 'react-canvas-knob';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';

const styles = theme => ({
	root: theme.mixins.gutters({
		paddingTop: 16,
		paddingBottom: 16,
		marginTop: theme.spacing.unit * 3,
	}),
	button: {
		margin: theme.spacing.unit,
	},
	input: {
		display: 'none',
	},
});

class ControlsPage extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			value: 50
		};
	}

	handleChange = (newValue) => {
		console.timeEnd();
		this.setState({value: newValue});
		console.log(" new value: " + newValue);
		console.time();
	};

	render() {

		const {classes} = this.props;

		return (
			<div>
				<Paper className={classes.root} elevation={3}>
					<Knob
						value={this.state.value}
						onChange={this.handleChange}
						width={150}
						max={360}
						step={0.01}
						cursor={20}
						stopper={false}
						font={'Roboto'}
					/>
				</Paper>
			</div>
		)
	}
}

ControlsPage.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ControlsPage);