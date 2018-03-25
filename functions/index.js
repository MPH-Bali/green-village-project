const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const data = require('./data.json');

exports.dbInit = functions.https.onRequest((req, res) => {
	const db = admin.firestore();
	let promises = [];

	for (let key in data) {
		const collection = db.collection(key);

		data[key].forEach((document, docKey) => {
			let id = key + (parseInt(docKey) + 1);
			promises.push(collection.doc(id).set(document));
		})
	}
	return Promise.all(promises)
		.then(() => res.status(200).send())
})
