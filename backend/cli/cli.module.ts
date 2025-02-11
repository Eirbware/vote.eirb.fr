import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from '../libs/database/database.module';
import { ShowCampagneCommand } from './commands/current-campagne.command';
import { SeedDbCommand } from './commands/seed-db.command';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../.env',
    }),
    DatabaseModule,
  ],
  providers: [ShowCampagneCommand, SeedDbCommand],
})
export class CliModule {}
