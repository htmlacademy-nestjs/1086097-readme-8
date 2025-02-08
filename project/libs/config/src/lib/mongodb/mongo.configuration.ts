import { IsNumber, IsOptional, IsString, Max, Min, validateOrReject } from 'class-validator';
import { MongoConfigurationPorts, EnvValidationMessage } from '@project/core';

export class MongoConfiguration {
  @IsString({ message: EnvValidationMessage.DBNameRequired })
  public name!: string;

  @IsString({ message: EnvValidationMessage.DBHostRequired })
  public host!: string;

  @IsNumber({}, { message: EnvValidationMessage.DBPortRequired })
  @Min(MongoConfigurationPorts.MIN_PORT)
  @Max(MongoConfigurationPorts.MAX_PORT)
  @IsOptional()
  public port: number = MongoConfigurationPorts.DEFAULT_MONGO_PORT;

  @IsString({ message: EnvValidationMessage.DBUserRequired })
  public user!: string;

  @IsString({ message: EnvValidationMessage.DBPasswordRequired })
  public password!: string;

  @IsString({ message: EnvValidationMessage.DBBaseAuthRequired })
  public authBase!: string;

  public async validate(): Promise<void> {
    // await validateOrReject(this);

    try {
      await validateOrReject(this);
    } catch (errors) {
      console.warn('Async validateOrReject() - Validation failed. Errors: ', errors);
    }
  }
}
