import * as admin from 'firebase-admin';
import { HttpException, HttpStatus } from '@nestjs/common';

// import serviceAccount from '../ServiceAccountKey.json';

// admin.initializeApp({credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)});
admin.initializeApp();

const db = admin.firestore();

const getAll = async (database: string) => {
  const { docs } = await db.collection(database).get();
  return docs.map((doc) => doc.data());
};

const findByName = async (database: string, name: string) => {
  const { docs } = await db.collection(database).where('name', '==', name).get();
  if (docs.length === 0) return undefined;
  return docs[0];
};

const findOne = async (database: string, name: string) => {
  const doc = await findByName(database, name);
  return doc ? doc.data() : undefined;
};

const insert = async (database: string, doc) => {
  const match = await findByName(database, doc.name);
  if (match != null) throw new HttpException('name already exists', HttpStatus.BAD_REQUEST);
  return db.collection(database).add(doc);
};

const update = async (database: string, name: string, doc) => {
  const match = await findByName(database, name);
  if (match == null) throw new HttpException('name not found', HttpStatus.BAD_REQUEST);
  const { id } = match;
  return db.collection(database)
    .doc(id)
    .update(doc);
};

const remove = async (database: string, name: string) => {
  const match = await findByName(database, name);
  if (match == null) throw new HttpException('name not found', HttpStatus.BAD_REQUEST);
  const { id } = match;
  return db.collection(database)
    .doc(id)
    .delete();
};

const deleteAll = async (database: string) => {
  const { docs } = await db.collection(database).get();
  const ids = docs.map(({ id }) => id);
  ids.map((id) => db.collection(database)
    .doc(id)
    .delete());
  await Promise.all(ids);
};

export {
  getAll,
  insert,
  update,
  remove,
  findOne,
  deleteAll,
};
