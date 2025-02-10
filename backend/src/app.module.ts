import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from 'libs/database/database.module';
import { CampagneModule } from './Campagne/campagne.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from 'libs/core/modules/jwt/jwt.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from 'libs/core/filters';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../.env',
    }),
    DatabaseModule,
    JwtModule,

    // Routes
    AuthModule,
    CampagneModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
