export enum defaultPorts {
  DEFAULT_PORT = 3006,
  DEFAULT_MONGO_PORT = 27017,
  DEFAULT_RABBIT_PORT = 5672,
  DEFAULT_SMTP_PORT = 25,
}

export const ENVIRONMENTS = ['development', 'production', 'stage'] as const;
