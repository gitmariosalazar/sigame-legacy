import { Module, Global } from '@nestjs/common';
import { DatabaseAbstract } from './abstract/abstract.database';
import { DatabaseServicePostgreSQL } from './postgresql/postgresql.service';
import { DatabaseServiceSQLServer2000 } from './sqlserver/sqlserver-2000.service';
import { DatabaseServiceSQLServer2022 } from './sqlserver/sqlserver-2022.service';
import { environments } from '../../../settings/environments/environments';

const getDatabaseService = () => {
  switch (environments.DATABASE_TYPE) {
    case 'postgres':
      return DatabaseServicePostgreSQL;
    case 'sqlserver_2000':
      return DatabaseServiceSQLServer2000;
    case 'sqlserver_2022':
    default:
      return DatabaseServiceSQLServer2022;
  }
};

const databaseProvider = {
  provide: DatabaseAbstract,
  useExisting: getDatabaseService(),
};

@Global()
@Module({
  providers: [
    DatabaseServicePostgreSQL,
    DatabaseServiceSQLServer2000,
    DatabaseServiceSQLServer2022,
    databaseProvider,
  ],
  exports: [DatabaseAbstract],
})
export class DatabasePersistenceModule {}
