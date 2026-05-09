import { Module } from '@nestjs/common';
import { AppController } from './app/controller/app.controller';
import { AppService } from './app/service/app.service';
import { HomeModule } from './app/module/home.module';
import { AppSigameLegacyModulesUsingSQLServer } from './factory/sqlserver/modules-using-sqlserver.module';
import { AppSigameLegacyModulesUsingPostgreSQL } from './factory/postgresql/modules-using-postgresql.module';
import { environments } from './settings/environments/environments';
import { DatabasePersistenceModule } from './shared/connections/database/database-persistence.module';

const getLegacyModules = () => {
  const dbType = environments.DATABASE_TYPE;
  if (dbType === 'postgres') return AppSigameLegacyModulesUsingPostgreSQL;
  // Both sqlserver versions use the same SQL Server modules factory
  if (dbType === 'sqlserver_2000' || dbType === 'sqlserver_2022') {
    return AppSigameLegacyModulesUsingSQLServer;
  }
  // Default to SQL Server 2022 modules
  return AppSigameLegacyModulesUsingSQLServer;
};

const legacyModules = getLegacyModules();

@Module({
  imports: [HomeModule, legacyModules, DatabasePersistenceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
