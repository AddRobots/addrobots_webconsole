import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase'

let config = {
	apiKey: "AIzaSyDmInOEZxDcox4QLqjLcuPOViaSAdppMG0",
	authDomain: "addrobots-console.firebaseapp.com",
	databaseURL: "https://addrobots-console.firebaseio.com",
	projectId: "addrobots-console",
	storageBucket: "addrobots-console.appspot.com",
	messagingSenderId: "852102904693"
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
		this.isLoggedIn = this.isLoggedIn.bind(this);
		this.fetchOAuthToken = this.fetchOAuthToken.bind(this);
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
				this.fetchOAuthToken();
			});
	};

	isLoggedIn = () => {
		return (this.state.user !== null);
	}

	componentDidMount() {
		let self = this;
		firebaseAuth.onAuthStateChanged((user) => {
			if (user) {
				self.setState({user});
			}
		});
	}

	fetchOAuthToken = () => {
		firebaseAuth.currentUser.getIdToken()
			.then(token => {
				return fetch('https://us-central1-addrobots-console.cloudfunctions.net/getOAuthToken', {
					method: 'GET',
					headers: {
						'Content-Type': 'multipart/form-data',
						'Authorization': 'Bearer ' + token,
					},
					mode: 'no-cors'
				}).then(response => {
					if (response.status >= 400) {
						this.setState({
							value: 'no greeting - status > 400'
						});
						throw new Error('no greeting - throw');
					}
					response.json().then(json => {
						var stuff = json;
						this.setState({
							oAuthToken: stuff
						})
					})
				}).catch(error => {
					console.log('auth error: ' + error);
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

export const firebaseApp = firebase.initializeApp(config);
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const firebaseAuth = firebase.auth();
export const firebaseLogin = new FirebaseLogin(FirebaseLogin.propTypes);

//export default FirebaseLogin;
