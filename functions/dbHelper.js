/* eslint-disable */

function deleteCollection(db, collectionPath, batchSize) {
	var collectionRef = db.collection(collectionPath);
	var query = collectionRef.orderBy('__name__');

	return new Promise((resolve, reject) => {
		deleteQueryBatch(db, query, batchSize, resolve, reject);
	});
}

function deleteQueryBatch(db, query, batchSize, resolve, reject) {
	let numDeleted = null;
	return query.get()
		.then((snapshot) => {
			numDeleted = snapshot.size;
			// When there are no documents left, we are done
			if (snapshot.size === 0) {
				return 0;
			}

			// Delete documents in a batch
			var batch = db.batch();
			snapshot.docs.forEach((doc) => {
				batch.delete(doc.ref);
			});

			return batch.commit();
		})
		.then(() => {
			if (numDeleted === 0) {
				resolve();
				return;
			}
			// Recurse on the next process tick, to avoid
			// exploding the stack.
			process.nextTick(() => deleteQueryBatch(db, query, batchSize, resolve, reject));
		})
		.catch(reject);
}
module.exports = {
	deleteCollection
}
