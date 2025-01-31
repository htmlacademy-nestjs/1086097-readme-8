import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

const DEFAULT_PORT = 3000;

enum ENVIRONMENTS {
  Development = 'development',
  Production = 'production',
  Stage = 'stage'
};

export interface AppConfig {
  environment: string;
  port: number;
}

const validationSchema = Joi.object({
  environment: Joi.string().valid(...Object.values(ENVIRONMENTS)).required(),
  port: Joi.number().port().default(DEFAULT_PORT),
});

function validateConfig(config: AppConfig): void {
  const { error } = validationSchema.validate(config, { abortEarly: true });
  if (error) {
    throw new Error(`[Application Config Validation Error]: ${error.message}`);
  }
}

function getConfig(): AppConfig {
  const config: AppConfig = {
    environment: process.env['NODE_ENV'] as ENVIRONMENTS,
    port: parseInt(process.env['PORT'] || `${DEFAULT_PORT}`, 10),
  };

  validateConfig(config);
  console.log(config.port);
  return config;
}

export default registerAs('app', getConfig);
