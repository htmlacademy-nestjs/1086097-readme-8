import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

const DEFAULT_RABBIT_PORT = 5672;

export interface RabbitConfig {
  port: number;
  host?: string;
  password?: string;
  user?: string;
  queue?: string;
  exchange?: string;
}

const validationSchema = Joi.object({
  port: Joi.number().port().default(DEFAULT_RABBIT_PORT),
  host: Joi.string().valid().hostname().required(),
  password: Joi.string().required(),
  user: Joi.string().required(),
  queue: Joi.string().required(),
  exchange: Joi.string().required(),
});

function validateConfig(config: RabbitConfig): void {
  const { error } = validationSchema.validate(config, { abortEarly: true });
  if (error) {
    throw new Error(`[Rabbit Config Validation Error]: ${error.message}`);
  }
}

function getConfig(): RabbitConfig {
  const config: RabbitConfig = {
    host: process.env['RABBIT_HOST'],
    password: process.env['RABBIT_PASSWORD'],
    port: parseInt(process.env['RABBIT_PORT'] ?? DEFAULT_RABBIT_PORT.toString(), 10),
    user: process.env['RABBIT_USER'],
    queue: process.env['RABBIT_QUEUE'],
    exchange: process.env['RABBIT_EXCHANGE'],
  };

  validateConfig(config);
  return config;
}

export default registerAs('rabbit', getConfig);
