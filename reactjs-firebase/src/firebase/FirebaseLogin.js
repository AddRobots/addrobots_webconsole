import firebase from 'firebase'

let config = {
	apiKey: "AIzaSyDmInOEZxDcox4QLqjLcuPOViaSAdppMG0",
	authDomain: "addrobots-console.firebaseapp.com",
	databaseURL: "https://addrobots-console.firebaseio.com",
	projectId: "addrobots-console",
	storageBucket: "addrobots-console.appspot.com",
	messagingSenderId: "852102904693"
};

class FirebaseLogin {

	constructor() {
		this.user = null;
		this.oAuthToken = null;
	}

	logout = () => {
		firebaseAuth.signOut()
			.then(() => {
				this.user = null;
				this.oAuthToken = null;
			});
	};

	login = () => {
		firebaseAuth.signInWithPopup(googleProvider)
			.then((result) => {
				this.user = result.user;
				this.fetchOAuthToken();
			});
	};

	isLoggedIn = () => {
		return (this.user !== null);
	};

	fetchOAuthToken = () => {
		firebaseAuth.currentUser.getIdToken()
			.then(token => {
				return fetch('https://us-central1-addrobots-console.cloudfunctions.net/getOAuthToken', {
					method: 'GET',
					headers: {
						'Content-Type': 'multipart/form-data',
						'Authorization': 'Bearer ' + token,
					}
				}).then(response => {
					if (response.status >= 400) {
						throw new Error('auth error - response code: ' + response.status);
					}
					response.text().then(secret => {
						if (secret !== null) {
							this.oAuthToken = secret;
						}
					});

				}).catch(error => {
					console.log('auth error: ' + error);
				})

			})
			.catch();
	};

	getOAuthToken = () => {
		return this.oAuthToken;
	};
}

export const firebaseApp = firebase.initializeApp(config);
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const firebaseAuth = firebase.auth();
export const firebaseLogin = new FirebaseLogin();

firebaseLogin.login();