import { Db, MongoClient } from "mongodb";

let db: Db;

export async function connectMongo(port: number) {
  const client = new MongoClient(`mongodb://admin:password@localhost:${port}/admin`);
  try {
    if (db === undefined) {
      await client.connect();
      db = client.db("admin");
      return db;
    } else {
      db;
    }
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}
