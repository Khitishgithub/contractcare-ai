// path-to-your-db-utility.js

import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

export async function getContractFromDatabase(invoiceNumber) {
  try {
    await client.connect();
    const database = client.db('test');
    const contracts = database.collection('contracts');
    const contract = await contracts.findOne({ invoiceNumber });

    return contract;
  } finally {
    await client.close();
  }
}
