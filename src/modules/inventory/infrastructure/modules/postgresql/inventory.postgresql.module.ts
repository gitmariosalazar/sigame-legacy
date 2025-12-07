import { Module } from '@nestjs/common';
import { DatabaseServiceSQLServer2022 } from '../../../../../shared/connections/database/postgresql/sqlserver.service';
import { InventoryService } from '../../../application/services/inventory.service';
import { SqlServerInventoryPersistence } from '../../repositories/sqlserver/persistence/sqlserver.inventory.persistence';
import { InventoryController } from '../../controller/inventory.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { environments } from '../../../../../settings/environments/environments';

@Module({
  imports: [
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
    // Add providers here
    DatabaseServiceSQLServer2022,
    InventoryService,
    {
      provide: 'InventoryRepository',
      useClass: SqlServerInventoryPersistence,
    },
  ],
  exports: [],
})
export class SqlServerInventoryModule {}
