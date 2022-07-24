// /api/new-meetup
// POST /api/new-meetup
// Nextjs ensures this code never ends up client side so you don't really need
// dotenv

import * as dotenv from "dotenv";
dotenv.config();
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_CONNECT;

export default async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(uri);
    const db = client.db();
    const meetupsCollection = db.collection("meetups");
    const result = await meetupsCollection.insertOne(data);
    client.close();

    res.status(201).json(data);
  }
}
