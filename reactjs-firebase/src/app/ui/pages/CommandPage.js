import React from 'react';
import PropTypes from 'prop-types';
import CommandEdit from "../../components/CommandEdit";
import {withStyles} from "material-ui/styles/index";

const styles = theme => ({
	root: {
		flexGrow: 1,
		marginTop: 30,
	},
	container: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	formControl: {
		margin: theme.spacing.unit,
		width: '80%',
	},
	button: {
		marginTop: 50,
		width: '80%'
	},
});

class CommandPage extends React.Component {

	render() {
		const {classes} = this.props;

		return (
			<div className={classes.container}>
				<CommandEdit/>
			</div>
		);
	}
}

CommandPage.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CommandPage);