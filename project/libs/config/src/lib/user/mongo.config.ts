import { registerAs } from '@nestjs/config';
import { plainToClass } from 'class-transformer';
import { MongoConfiguration } from '../mongodb/mongo.configuration';

const DEFAULT_MONGO_PORT = 27017;

export interface MongoConfig {
  host?: string;
  name?: string;
  port: number;
  user?: string;
  password?: string;
  authBase?: string;
}

async function getDbConfig(): Promise<MongoConfiguration> {
  const config = plainToClass(MongoConfiguration, {
    host: process.env['MONGO_HOST'],
    name: process.env['MONGO_DB'],
    port: parseInt(process.env['MONGO_PORT'] ?? `${DEFAULT_MONGO_PORT}`, 10),
    user: process.env['MONGO_USER'],
    password: process.env['MONGO_PASSWORD'],
    authBase: process.env['MONGO_AUTH_BASE'],
  });

  await config.validate();
  return config;
}

export default registerAs('db', async () => getDbConfig());
