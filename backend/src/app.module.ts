import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';

import { DatabaseModule } from 'libs/database/database.module';
import { JwtModule } from 'libs/core/modules/jwt/jwt.module';
import { HttpExceptionFilter } from 'libs/core/filters';

import { CampagneModule } from './campagne/campagne.module';
import { AuthModule } from './auth/auth.module';

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
