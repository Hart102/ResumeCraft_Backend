import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserInfo } from './users/entities/userInfo';
import { UserContact } from './users/entities/userContact';
import { UserAddress } from './users/entities/userAddress';
import { UserAcademicBackground } from './users/entities/userAcademicBackground';

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
      synchronize: true, // Set to false in production
    }),
    TypeOrmModule.forFeature([UserInfo, UserContact, UserAddress, UserAcademicBackground ]), // Register the entity
  ],
//   providers: [UserInfoRepository],
//   exports: [UserInfoRepository],

    providers: [],
    exports: [],
})
export class AppModule {}
