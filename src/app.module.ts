import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserSchema } from './schemas/user.schema';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
 
@Module({
  imports: [
      ConfigModule.forRoot(),
      MongooseModule.forRoot('mongodb://localhost:27017', {
          dbName: process.env.DB_NAME
      }),
      MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
