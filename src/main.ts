import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { environments } from './settings/environments/environments';
import * as morgan from 'morgan';
import { DatabaseServicePostgreSQL } from './shared/connections/database/postgresql/postgresql.service';

async function bootstrap() {
  const logger: Logger = new Logger('SigameLegacyApp');

  const app = await NestFactory.create(AppModule);

  await app.listen(environments.NODE_ENV === 'production' ? 3015 : 4015);
  app.use(morgan('dev'));


  const postgresqlService: DatabaseServicePostgreSQL = new DatabaseServicePostgreSQL();

  logger.log(await postgresqlService.connect())
  logger.log(
    `🚀🎉 The SigameLegacy microservice is running on: http://localhost:${environments.NODE_ENV === 'production' ? 3007 : 4007}✅`,
  );

  const microservice = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: environments.SIGAME_LEGACY_KAFKA_CLIENT_ID,
        brokers: [environments.KAFKA_BROKER_URL],
      },
      consumer: {
        groupId: environments.SIGAME_LEGACY_KAFKA_GROUP_ID,
        allowAutoTopicCreation: true,
      },
    },
  });

  await microservice.listen();
  logger.log(`🚀🎉 The SigameLegacy - microservice is listening to KAFKA...✅`);
}
bootstrap();
