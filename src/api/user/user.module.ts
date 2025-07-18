import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from 'src/entities/user.entity';
import { UserTalusRelationModule } from '../user-talus-relation/user-talus-relation.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), UserTalusRelationModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
