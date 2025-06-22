import { Controller, Post, Get, Body, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { FilesService } from 'src/services/files.service';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  async upload(
    @Body()
    body: {
      username: string;
      urlFiles: string;
      fileType: string;
      fileName: string;
    },
  ) {
    return this.filesService.uploadForStudent(
      body.username,
      body.urlFiles,
      body.fileType,
      body.fileName,
    );
  }

  @Get('my')
  @UseGuards(JwtAuthGuard)
  async myFiles(@Req() req) {
    const userId = req.user.name;
    return this.filesService.getFilesForStudent(userId);
  }
}
