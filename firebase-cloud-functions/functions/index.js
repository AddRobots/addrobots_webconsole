const functions = require('firebase-functions');
const cors = require('cors')({origin: true});
const admin = require('firebase-admin');
const google = require('googleapis');

admin.initializeApp(functions.config().firebase);

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
								});
						}
					})
					.catch((err) => res.status(401).send(err));
			})
			.catch((err) => res.status(401).send(err));
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
