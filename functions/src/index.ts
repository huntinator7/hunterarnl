import {beforeUserCreated, HttpsError} from "firebase-functions/v2/identity";

// The Firebase Admin SDK to access Firestore.
import {initializeApp} from "firebase-admin/app";

initializeApp();

export const beforecreated = beforeUserCreated((event) => {
  console.log(event);
  throw new HttpsError("permission-denied", "You can't make a profile here");
});

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
