import { Module } from '@nestjs/common';
import { SqlServerInventoryModule } from '../../modules/inventory/infrastructure/modules/sqlserver/inventory.sql-server.module';

@Module({
  imports: [SqlServerInventoryModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppSigameLegacyModulesUsingSQLServer {}
