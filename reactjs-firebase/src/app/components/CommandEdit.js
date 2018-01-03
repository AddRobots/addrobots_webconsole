import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import MsgActions from 'app/actions/MsgActions';
import MotorMsgs from '../../protobuf-msgs/MotorMsg_pb';
import VehicleMsgs from '../../protobuf-msgs/VehicleMsg_pb';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Input, {InputLabel} from 'material-ui/Input';
import {FormControl, FormHelperText} from 'material-ui/Form';
import Button from 'material-ui/Button';
import trim from 'trim';
import base64js from 'base64-js';

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

class CommandEdit extends Component {

	constructor(props) {
		super(props);
		this.state = {
			robotId: "123",
			secretKey: "secret",
			command: "{ \"drive\" : { \"direction\" : \"FWD\", \"distance\" : 1.0, \"acceleration\" : 0.025, \"velocity\" : 0.5, \"edgeDistance\" : 0.0 } }",
		};
		this.handleChange = this.handleChange.bind(this);
		this.execute = this.execute.bind(this);
	}

	handleChange = (fieldId, event) => {
		this.setState({
			[fieldId]: event.target.value
		});
	};

	execute = () => {
		MsgActions.execCommand(this.state.secretKey, this.state.robotId, JSON.parse(this.state.command))
			.then((json) => {
				// handle success
				console.log('result: ' + json);
			})
			.catch(error => error);
		/*this.setState({
			message: ''
		});*/
	};

	render() {
		const {classes} = this.props;

		return (
			<div>
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
					</Grid>
				</Grid>
				<Grid container spacing={8}>
					<Grid item xs={2}>
						<Button id="excute" raised className={classes.button} onClick={this.execute}>
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
		)
	}
}

CommandEdit.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CommandEdit);