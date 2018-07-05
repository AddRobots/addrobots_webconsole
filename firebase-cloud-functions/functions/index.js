const functions = require('firebase-functions');
const cors = require('cors')({origin: true});
const admin = require('firebase-admin');
const {google} = require('googleapis');

admin.initializeApp(functions.config().firebase);

/*
	Firebase Cloud Messaging doesn't allow remotes to send messages securely!

	This cloud function is a bridge that makes that possible securely.

	We store the Firebase Cloud Message API private key in the Firebase database
	so that we don'thave to include it in the stored code. Then this cloud function
	gets called by a remote (e.g. Android, Javascript) using the logged-in user's
	current uid-derived temp token. This token is used to gain secure access
	to the Firebase database so we can get the private API key. We then use
	that private key to make a JWT temp-token call to the server.

	If we succeed, we pass that token back to the caller, so that they can
	use it to send Firebase Cloud Messages.
 */

exports.getOAuthToken = functions.https.onRequest((req, res) => {
	cors(req, res, () => {
		const tokenId = req.get('Authorization').split('Bearer ')[1];

		return admin.auth().verifyIdToken(tokenId)
			.then((decoded) => {
				const original = req.query.text;
				admin.database().ref('/admin/fcm/auth/').once('value')
					.then(function (snapshot) {
						if (snapshot.val()) {
							let privateKey = snapshot.val().privateKey;
							let email = snapshot.val().email;
							getAccessToken(privateKey, email)
								.then(authToken => {
									res.status(200).send(authToken);
								})
								.catch((err) => res.status(401).send(err.message));
						} else {
							res.status(401).send('bad snapshot')
						}
					})
					.catch((err) => res.status(401).send(err.message));

			})
			.catch((err) => res.status(401).send(err.message));
	});
});

function getAccessToken(privateKey, email) {
	return new Promise(function (resolve, reject) {
		var jwtClient = new google.auth.JWT(
			email,
			null,
			privateKey,
			[
				'https://www.googleapis.com/auth/firebase.messaging'
			]
		);
		jwtClient.authorize(function (err, tokens) {
			if (err) {
				reject(err);
				return 'not authorized';
			}
			resolve(tokens.access_token);
		});
	});
}
