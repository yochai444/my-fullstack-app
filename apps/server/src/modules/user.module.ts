import { Module } from '@nestjs/common';
import { UserController } from 'src/controllers/user.controller';
import { UserService } from 'src/services/user.service';
import { userProviders } from 'src/providers/user.providers';

@Module({
  controllers: [UserController],
  providers: [UserService, userProviders],
})
export class UserModule {}
