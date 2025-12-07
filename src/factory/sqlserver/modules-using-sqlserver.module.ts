import { Module } from '@nestjs/common';
import { SqlServerInventoryModule } from '../../modules/inventory/infrastructure/modules/postgresql/inventory.postgresql.module';

@Module({
  imports: [SqlServerInventoryModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppSigameLegacyModulesUsingSQLServer {}
