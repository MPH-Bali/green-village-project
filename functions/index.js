const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.triggerTest = functions.firestore.document('stock/{stockId}').onCreate(event => {
    const newValue = event.data.data();
    console.log(event);
    if(newValue.amount > 10) {
      console.log('a lot of stock');
    }
    return true;
});
