import { MONGODB_URI } from '@/config/env';
import { MongoClient } from 'mongodb';

const options = {};

class Singleton {
  private static _instance: Singleton;
  private client: MongoClient;
  private clientPromise: Promise<MongoClient>;

  private constructor() {
    this.client = new MongoClient(MONGODB_URI, options);
    this.clientPromise = this.client.connect();
  }

  public static get instance() {
    if (!this._instance) {
      this._instance = new Singleton();
    }
    return this._instance.clientPromise;
  }
}
const mongoDbClient = Singleton.instance;

export default mongoDbClient;
