import * as admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FSA_PROJECT_ID,
      privateKey: process.env.FSA_PRIVATE_KEY
        ? process.env.FSA_PRIVATE_KEY.replace(/\\n/g, "\n")
        : process.env.FSA_PRIVATE_KEY,
      clientEmail: process.env.FSA_CLIENT_EMAIL,
    }),
  });
}

export const db = admin.firestore();
