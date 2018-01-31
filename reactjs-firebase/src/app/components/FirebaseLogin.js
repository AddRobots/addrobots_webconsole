import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import {firebaseAuth, googleProvider} from '../../firebase/FirebaseSetup'
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
			user: null,
			oAuthToken: null
		};
		this.login = this.login.bind(this);
		this.logout = this.logout.bind(this);
	}

	logout = () => {
		let self = this;
		firebaseAuth.signOut()
			.then(() => {
				self.setState({
					user: null,
					oAuthToken: null
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
				fetchOAuthToken();
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

	fetchOAuthToken() {
		firebaseAuth.instance.currentUser.getIdToken()
			.then(token => {
				return fetch('https://us-central1-addrobots-console.cloudfunctions.net/getOAuthToken', {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'authorization': 'key=' + firebaseAuth.token,
						'Accept': 'application/json',
					},
					body: JSON.stringify(message)
				}).then(response => {
					if (response.status >= 400) {
						this.setState({
							value: 'no greeting - status > 400'
						});
						throw new Error('no greeting - throw');
					}
					var stuff = response.json()
					this.setState({
						oAuthToken: stuff
					})
				}).catch(() => {
					this.setState({
						value: 'no greeting - cb catch'
					})
				})

			})
			.catch();
	}

	getOAuthToken() {

	}
}

FirebaseLogin.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FirebaseLogin);