import EnvVars from '@src/apps/api-server/constants/EnvVars';
import { MongoClient, Db } from 'mongodb';

let mongoDB: Db;

export async function createMongoClient() {
  if (mongoDB) {
    return mongoDB;
  }

  const client = await MongoClient.connect(EnvVars.MongoUri);
  mongoDB = await client.db(EnvVars.MongoDB);
  return mongoDB;
}
