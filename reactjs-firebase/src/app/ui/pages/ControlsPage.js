import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';

const styles = theme => ({
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
	}

	render() {

		const {classes} = this.props;

		return (
			<Button raised className={classes.button}>
				Button
			</Button>
		)
	}
};

ControlsPage.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ControlsPage);