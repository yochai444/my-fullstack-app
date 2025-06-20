import { Module } from '@nestjs/common';
import { UserModule } from './user.module';
import { FilesService } from 'src/services/files.service';
import { userProviders } from 'src/providers/user.providers';
import { FilesController } from 'src/controllers/files.controller';

@Module({
  imports: [UserModule],
  controllers: [FilesController],
  providers: [FilesService, userProviders],
})
export class FilesModule {}
