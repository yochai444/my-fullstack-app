import { Controller, Post, Get, Body, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { FilesService } from 'src/services/files.service';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  async upload(@Body() body: { username: string; urlFiles: string }) {
    return this.filesService.uploadForStudent(body.username, body.urlFiles);
  }

  @Get('my')
  async myFiles(@Req() req) {
    const userId = req.user.sub;
    return this.filesService.getFilesForStudent(userId);
  }
}
