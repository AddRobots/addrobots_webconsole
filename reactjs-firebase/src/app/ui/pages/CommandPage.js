import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Input, {InputLabel} from 'material-ui/Input';
import {FormControl, FormHelperText} from 'material-ui/Form';

const styles = theme => ({
	container: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	formControl: {
		margin: theme.spacing.unit,
	},
});

class CommandPage extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			command: "",
			secretKey: "",
			robotId: "",
		};
		this.handleChange = this.handleChange.bind(this);
	}


	handleChange = (fieldId, event) => {
		this.setState({
			[fieldId]: event.target.value
		});
	};

	render() {
		const {classes} = this.props;

		return (
			<div className={classes.container}>
				<FormControl className={classes.formControl}>
					<InputLabel htmlFor="name-simple">Command</InputLabel>
					<Input id="name-command" value={this.state.command} onChange={(event) => this.handleChange("command", event)}/>
				</FormControl>
				<FormControl className={classes.formControl}>
					<InputLabel htmlFor="name-simple">Secret Key</InputLabel>
					<Input id="name-secretKey" value={this.state.secretKey} onChange={(event) => this.handleChange("secretKey", event)}/>
				</FormControl>
				<FormControl className={classes.formControl}>
					<InputLabel htmlFor="name-simple">Robot Id</InputLabel>
					<Input id="name-robotId" value={this.state.robotId} onChange={(event) => this.handleChange("robotId", event)}/>
				</FormControl>
			</div>
		);
	}
}

CommandPage.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CommandPage);