import { ConfigService } from '@nestjs/config';
import mongoose from 'mongoose';

export const databaseProviders = async (config: ConfigService) => {
  const uri = `mongodb://${config.get('MONGO_ROOT_USERNAME')}:${config.get('MONGO_ROOT_PASSWORD')}@${config.get<string>('MONGO_HOST')}:${config.get('MONGO_PORT')}/${config.get('MONGO_DATABASE_NAME')}?authSource=admin`;

  try {
    await mongoose.connect(uri);
    mongoose.connection.on('connected', () => {
      console.log('Successfully connected to MongoDB');
    });

    mongoose.connection.on('error', (error: Error) => {
      console.error('MongoDB connection error', error.message);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('Disconnected from MongoDB');
    });
  } catch (error: unknown) {
    console.error('MongoDB connection error', error);
  }

  return { uri };
};
