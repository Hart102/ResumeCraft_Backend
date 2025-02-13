import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserInfo } from './entities/userInfo';
import { UserContact } from './entities/userContact';
import { UserAddress } from './entities/userAddress';
import { UserAcademicBackground } from './entities/userAcademicBackground';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Hart102',
      database: 'user_manager',
      entities: [UserInfo, UserContact, UserAddress, UserAcademicBackground],
      synchronize: true,
      logging: true,
    }),
    TypeOrmModule.forFeature([UserInfo, UserContact, UserAddress, UserAcademicBackground ]),
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
