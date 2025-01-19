import { ClassTransformOptions, plainToInstance } from 'class-transformer';
import { ConfigService } from '@nestjs/config';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { MailerAsyncOptions } from '@nestjs-modules/mailer/dist/interfaces/mailer-async-options.interface';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { resolve } from 'node:path';

type PlainObject = Record<string, unknown>;

export function fillDto<T, V>(
  DtoClass: new () => T,
  plainObject: V,
  options?: ClassTransformOptions,
): T;

export function fillDto<T, V extends []>(
  DtoClass: new () => T,
  plainObject: V,
  options?: ClassTransformOptions,
): T[];

export function fillDto<T, V>(
  DtoClass: new () => T,
  plainObject: V,
  options?: ClassTransformOptions,
): T | T[] {
  return plainToInstance(DtoClass, plainObject, {
      excludeExtraneousValues: true,
      ...options,
  });
}

export function getMongoConnectionString({username, password, host, port, databaseName, authDatabase}): string {
  return `mongodb://${username}:${password}@${host}:${port}/${databaseName}?authSource=${authDatabase}`;
}

export function getMongooseOptions(optionSpace: string): MongooseModuleAsyncOptions {
  return {
    useFactory: async (config: ConfigService) => {
      return {
        uri: getMongoConnectionString({
          username: config.get<string>(`${optionSpace}.db.user`),
          password: config.get<string>(`${optionSpace}.db.password`),
          host: config.get<string>(`${optionSpace}.db.host`),
          port: config.get<string>(`${optionSpace}.db.port`),
          authDatabase: config.get<string>(`${optionSpace}.db.authBase`),
          databaseName: config.get<string>(`${optionSpace}.db.name`),
        })
      }
    },
    inject: [ConfigService]
  }
}

export const getFormatedTags = (tags: string[]) => {
  const formatedTags = tags.map((tag) => tag.toLowerCase());
  const uniqueTags = new Set(formatedTags);
  return [...uniqueTags];
}

export function getRabbitMQConnectionString({user, password, host, port}): string {
  return `amqp://${user}:${password}@${host}:${port}`;
}

export function getRabbitMQOptions(optionSpace: string) {
  return {
    useFactory: async (config: ConfigService) => {
      const exchangeName = config.get<string>(`${optionSpace}.exchange`);

      if (!exchangeName) {
        throw new Error(`ExchangesName name is not defined in configuration for ${optionSpace}`);
      }

      return {
        exchanges: [
          {
            name: exchangeName,
            type: 'direct'
          }
        ],
        uri: getRabbitMQConnectionString({
          host: config.get<string>(`${optionSpace}.host`),
          password: config.get<string>(`${optionSpace}.password`),
          user: config.get<string>(`${optionSpace}.user`),
          port: config.get<number>(`${optionSpace}.port`),
        }),
        connectionInitOptions: { wait: false },
        enableControllerDiscovery: true,
      };
    },
    inject: [ConfigService]
  }
}

export function getMailerAsyncOptions(optionSpace: string): MailerAsyncOptions {
  return {
    useFactory: async (configService: ConfigService) => {
      return {
        transport: {
          host: configService.get<string>(`${optionSpace}.host`),
          port: configService.get<number>(`${optionSpace}.port`),
          secure: false,
          auth: {
            user: configService.get<string>(`${optionSpace}.user`),
            pass: configService.get<string>(`${optionSpace}.password`)
          }
        },
        defaults: {
          from: configService.get<string>('mail.from'),
        },
        template: {
          dir: resolve(__dirname, 'assets'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true
          }
        }
      }
    },
    inject: [ConfigService],
  }
}
