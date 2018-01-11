import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import firebaseApp, {firebaseAuth, googleProvider} from '../../firebase/FirebaseSetup'
import firebase from 'firebase';
import Button from 'material-ui/Button';

const styles = {
	root: {
		width: '100%',
	},
	flex: {
		flex: 1,
	},
	button: {
		marginTop: 50,
		marginLeft: 20,
		width: 50
	},
};

class FirebaseLogin extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			currentItem: '',
			username: '',
			items: [],
			user: null
		};
		this.login = this.login.bind(this);
		this.logout = this.logout.bind(this);
	}

	logout = () => {
		let self = this;
		firebaseAuth.signOut()
			.then(() => {
				self.setState({
					user: null
				});
			});
	};

	login = () => {
		let self = this;
		firebaseAuth.signInWithPopup(googleProvider)
			.then((result) => {
				const user = result.user;
				self.setState({
					user
				});
			});
	};

	componentDidMount() {
		let self = this;
		firebaseAuth.onAuthStateChanged((user) => {
			if (user) {
				self.setState({user});
			}
		});
	}

	render() {
		const {classes} = this.props;
		return (
			<div id="firebaseui-auth">
				<Button id="login" raised className={classes.button} onClick={this.login} disabled={this.state.user !== null}>
					Login
				</Button>
				<Button id="logout" raised className={classes.button} onClick={this.logout} disabled={this.state.user === null}>
					Logout
				</Button>
			</div>
		);
	}
}

FirebaseLogin.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FirebaseLogin);