import { Module } from '@nestjs/common';
import { AuthService } from 'src/services/auth.service';
import { UserModule } from './user.module';
import { AuthController } from 'src/controllers/auth.controller';
@Module({
  imports: [UserModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
