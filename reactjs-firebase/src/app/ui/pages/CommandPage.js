import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Input, {InputLabel} from 'material-ui/Input';
import {FormControl, FormHelperText} from 'material-ui/Form';
import Button from 'material-ui/Button';

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
				<Grid container spacing={24}>
					<Grid item xs={2}>
						<FormControl className={classes.formControl}>
							<InputLabel htmlFor="name-simple">Robot Id</InputLabel>
							<Input id="name-robotId" value={this.state.robotId} multiline rowsMax="4" onChange={(event) => this.handleChange("robotId", event)}/>
						</FormControl>
					</Grid>
					<Grid item xs={4}>
						<FormControl className={classes.formControl}>
							<InputLabel htmlFor="name-simple">Secret Key</InputLabel>
							<Input id="name-secretKey" value={this.state.secretKey} multiline rowsMax="4" onChange={(event) => this.handleChange("secretKey", event)}/>
						</FormControl>
					</Grid>
					<Grid item xs={6}>
						<FormControl className={classes.formControl}>
							<InputLabel htmlFor="name-simple">Command</InputLabel>
							<Input id="name-command" value={this.state.command} multiline rowsMax="4" onChange={(event) => this.handleChange("command", event)}/>
						</FormControl>
						{/*<Paper className={classes.paper}>xs=6</Paper>*/}
					</Grid>
				</Grid>
				<Grid container spacing={8}>
					<Grid item xs={2}>
						<Button id="excute" raised className={classes.button}>
							Execute
						</Button>
					</Grid>
					<Grid item xs={2}>
						<Button id="halt" raised className={classes.button}>
							Halt
						</Button>
					</Grid>
				</Grid>
			</div>
		);
	}
}

CommandPage.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CommandPage);