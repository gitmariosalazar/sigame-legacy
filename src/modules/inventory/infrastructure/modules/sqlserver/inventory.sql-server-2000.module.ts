import { Module } from '@nestjs/common';
import { InventoryService } from '../../../application/services/inventory.service';
import { InventoryController } from '../../controller/inventory.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { environments } from '../../../../../settings/environments/environments';
import { DatabasePersistenceModule } from '../../../../../shared/connections/database/database-persistence.module';
import { SqlServer2000InventoryPersistence } from '../../repositories/sqlserver/persistence/sqlserver-2000.inventory.persistence';

@Module({
  imports: [
    DatabasePersistenceModule,
    ClientsModule.register([
      {
        name: environments.INVENTORY_KAFKA_CLIENT,
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: [environments.KAFKA_BROKER_URL],
            clientId: environments.INVENTORY_KAFKA_CLIENT_ID,
          },
          consumer: {
            groupId: environments.INVENTORY_KAFKA_GROUP_ID,
          },
        },
      },
    ]),
  ],
  controllers: [InventoryController],
  providers: [
    InventoryService,
    {
      provide: 'InventoryRepository',
      useClass: SqlServer2000InventoryPersistence,
    },
  ],
  exports: [],
})
export class SqlServer2000InventoryModule {}
