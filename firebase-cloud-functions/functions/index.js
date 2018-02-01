const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.getOAuthToken = functions.https.onRequest((req, res) => {
//	cors(req, res, () => {
		const tokenId = req.get('Authorization').split('Bearer ')[1];

		return admin.auth().verifyIdToken(tokenId)
			.then((decoded) => {
				// Grab the text parameter.
				const original = req.query.text;
				admin.database().ref('/admin/key').once('value')
					.then(function (snapshot) {
						var secretKey = 'secret is: ' + (snapshot.val() && snapshot.val().secretKey);
						res.status(200).send(secretKey);
					})
					.catch((err) => res.status(401).send(err));
			})
			.catch((err) => res.status(401).send(err));
//	});
})
;
