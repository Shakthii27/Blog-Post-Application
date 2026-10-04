import "../loadEnvironment.mjs";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.ATLAS_URI || "");

try {
  await client.connect();
  console.log("Connected to MongoDB Atlas");
} catch (err) {
  console.error("MongoDB connection failed:", err.message);
  process.exit(1);
}

const db = client.db(process.env.DB_NAME || "blog");
export default db;
