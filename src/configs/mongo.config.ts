import { ConfigService } from '@nestjs/config';

export const getMongoConfig = async (
  configService: ConfigService,
): Promise<any> => {
  const uri = getMongoString(configService);
  if (!uri) throw new Error('MONGODB_URI is not defined in the configuration');

  return {
    uri,
    ...getMongoOptions(),
  };
};

const getMongoString = (configService: ConfigService): string | null => {
  return (
    configService.get<string>('MONGO_BASE') +
    '://' +
    configService.get<string>('MONGO_HOST') +
    ':' +
    configService.get<string>('MONGO_PORT') +
    '/' +
    configService.get<string>('MONGO_DB')
  );
};

const getMongoOptions = () => {
  return {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
};
