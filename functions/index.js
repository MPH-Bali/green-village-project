const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const data = require('./data.json');
const dbHelper = require('./dbHelper');
const db = admin.firestore();

exports.dbInit = functions.https.onRequest((req, res) => {
	let promises = [];

	for (let key in data) {
		const collection = db.collection(key);

		data[key].forEach((document, docKey) => {
			const id = key + (parseInt(docKey) + 1);
			promises.push(collection.doc(id).set(document));
		})
	}
	return Promise.all(promises)
		.then(() => res.status(200).send())
		.catch(e => console.log(e))
})

exports.dbDestroy = functions.https.onRequest((req, res) => {
	let promises = [];
	for (let key in data) {
		promises.push(dbHelper.deleteCollection(db, key));
	}
	return Promise.all(promises)
		.then(() => res.status(200).send())
		.catch(e => console.log(e))
})
