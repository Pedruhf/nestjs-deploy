import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TweetsModule } from './tweets/tweets.module';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        join(__dirname, '..', `.env.${process.env.NODE_ENV}`),
        join(__dirname, '..', '.env'),
      ],
    }),
    MongooseModule.forRoot(process.env.MONGO_CONNECTION_STRING),
    TweetsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
