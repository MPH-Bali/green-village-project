const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const data = require('./seed.json');
const dbHelper = require('./dbHelper');
const db = admin.firestore();
const moment = require('moment');
/* temporary
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
*/

// Chart reference
const week = moment().format('YYYY-ww')
const charts = db.collection('charts').doc(week)

// total No. devlieries
exports.totalPickups =
functions.firestore.document('delivery/{id}').onCreate(event => {
  // Get current chart data
  return charts.get().then(snapShot => {
    // Increment the total pickups
    const totalPickups = (snapShot.data().totalPickups || 0) + 1
    // Save the change to db
    return charts.set({ totalPickups }, { merge: true })
  })
})

// total hours per day
exports.workerHours =
functions.firestore.document('workerhours/{id}').onCreate(event => {
  const times = event.data.data().times
  return charts.get().then(snapShot => {
    // Assign the current worker hours or set default
    let workerHours = snapShot.data().workerHours || [0, 0, 0, 0, 0, 0, 0]
    // Add the day of the added entry to the total worker hours
    workerHours[moment(times.in).day()] += Math.abs(times.in - times.out) / 36e5
    // Save the change to db
    return charts.set({ workerHours }, { merge: true })
  })
})

// total material weight
exports.totalMaterialWeight =
functions.firestore.document('material/{id}').onCreate(event => {
  const material = event.data.data()
  return charts.get().then(snapShot => {
    let totalMaterialWeight = (snapShot.data().totalMaterialWeight || 0) + material.inorganic + material.organic
    return charts.set({ totalMaterialWeight }, { merge: true })
  })
})

// customer data
exports.chartsCustomerData =
functions.firestore.document('person/{id}').onWrite((event) => {
			let data = [];
			let promises = [];
			let types = ['household', 'villa', 'business'];

			 const getHouseTypeCount = (type)  => {
				return db.collection('person').where('houseType', '==', type).get()
				.then(snapshot => {
					data[type + 'Count'] = parseInt(snapshot.size);
					return;
				})
			}

			types.forEach(type => {
				promises.push(getHouseTypeCount(type));
			})

			return Promise.all(promises)
			.then(() => {
				console.log(data);
				return charts.set({customerData: {
						householdCount: data.householdCount + data.villaCount + data.businessCount,
						households: data.householdCount,
						businesses: data.businessCount,
						villas: data.villaCount
					}
				}, { merge: true })
			})
			.catch(e => console.log(e));
    });

// total No. client (person.type.client)
exports.chartsTotalClientNo =
	functions.firestore.document('person/{id}').onWrite((event) => {
		let clients = 0;
		return db.collection('person').get()
		.then(snapshot => {
			snapshot.forEach(doc => {
				let data = doc.data();
				console.log(data);
				if(data.type && data.type.client) {
					clients++;
				}
			})
			return charts.set({totalClients: clients
			}, { merge: true })
		})
		.catch(e => console.log(e));
})


    // material weight per type
    // total fees per day (last 7)
    // total fees per month (last 5)
    // total expenses per month by type (last 5)

    // total stock per day (last 5)

// analytics/wqewqe
