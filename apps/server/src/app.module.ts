import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user.module';
import { AuthModule } from './modules/auth.module';
import { FilesModule } from './modules/files.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    UserModule,
    AuthModule,
    FilesModule,
  ],
})
export class AppModule {}
