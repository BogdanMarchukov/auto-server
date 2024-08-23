import { Db, MongoClient } from "mongodb";

let db: Db;

export async function connectMongo() {
  const client = new MongoClient("mongodb://localhost:27017");
  try {
    if (db === undefined) {
      await client.connect();
      db = client.db("mydatabase");
      return db;
    } else {
      db;
    }
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}
