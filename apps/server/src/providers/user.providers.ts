import { MongoClient } from 'mongodb';

export const userProviders = {
  provide: 'MONGO_CLIENT',
  useFactory: async () => {
    const uri = process.env.MONGO_URI || 'mongodb://localhost:27017';
    const client = new MongoClient(uri);
    try {
      await client.connect();
      console.log('✅ MongoDB connected successfully.');
      return client;
    } catch (error) {
      console.error('❌ Failed to connect to MongoDB:', error);
      throw error; // rethrow so NestJS knows the provider failed
    }
  },
};
