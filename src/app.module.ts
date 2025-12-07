import { Module } from '@nestjs/common';
import { AppController } from './app/controller/app.controller';
import { AppService } from './app/service/app.service';
import { HomeModule } from './app/module/home.module';
import { AppSigameLegacyModulesUsingSQLServer } from './factory/sqlserver/modules-using-sqlserver.module';
@Module({
  imports: [HomeModule, AppSigameLegacyModulesUsingSQLServer],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
