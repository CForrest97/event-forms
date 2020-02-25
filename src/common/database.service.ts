import * as admin from 'firebase-admin';
import serviceAccount from '../ServiceAccountKey.json';

admin.initializeApp({ credential: admin.credential.cert(serviceAccount as admin.ServiceAccount) });

const db = admin.firestore();

const getAll = async (database: string): Promise<FirebaseFirestore.DocumentData[]> => {
  const snapshot = await db.collection(database).get();
  return snapshot.docs.map((doc) => doc.data());
};

const getOne = async (database: string, id: string): Promise<FirebaseFirestore.DocumentData> => {
  const snapshot = await db.collection(database).doc(id).get();
  return snapshot.data();
};

const insert = (database: string, name: string, doc): Promise<FirebaseFirestore.WriteResult> => db
  .collection(database)
  .doc(name)
  .set(doc);

const update = (database: string, name: string, doc): Promise<FirebaseFirestore.WriteResult> => db
  .collection(database)
  .doc(name)
  .update(doc);

const remove = (database: string, name: string): Promise<FirebaseFirestore.WriteResult> => db
  .collection(database)
  .doc(name)
  .delete();

export {
  getAll,
  getOne,
  insert,
  update,
  remove,
};
