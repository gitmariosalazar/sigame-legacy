import { Module, DynamicModule } from '@nestjs/common';
import { SqlServerInventoryModule } from '../../modules/inventory/infrastructure/modules/sqlserver/inventory.sql-server.module';
import { SqlServer2000InventoryModule } from '../../modules/inventory/infrastructure/modules/sqlserver/inventory.sql-server-2000.module';
import { environments } from '../../settings/environments/environments';

const getInventoryModule = () => {
  return environments.DATABASE_TYPE === 'sqlserver_2000'
    ? SqlServer2000InventoryModule
    : SqlServerInventoryModule;
};

@Module({
  imports: [getInventoryModule()],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppSigameLegacyModulesUsingSQLServer {}
