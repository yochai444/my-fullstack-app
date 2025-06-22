import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Db, MongoClient } from 'mongodb';
import { UserService } from './user.service';
import { Files, User } from 'src/types/userTypes';

export interface IFileType {
  _id: string;
  studentId: string;
  username: string;
  url: string;
  uploadedAt?: string;
  fileType: string;
  fileName: string;
}
const extractGoogleFileId = (url: string): string | null => {
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
};

@Injectable()
export class FilesService {
  private files;

  constructor(
    @Inject('MONGO_CLIENT') private readonly client: MongoClient,
    private readonly userService: UserService, // ← הכנס לכאן
  ) {
    const dbName = process.env.MONGO_DB_NAME;
    this.files = this.client.db(dbName).collection<Files>('files');
  }

  async uploadForStudent(
    username: string,
    url: string,
    fileType: string,
    fileName: string,
  ) {
    const student = await this.userService.findByUsername(username);
    if (!student) throw new NotFoundException('תלמיד לא קיים');

    await this.files.insertOne({
      studentId: student._id.toString(),
      username,
      url,
      uploadedAt: new Date(),
      fileType,
      fileName,
    });

    return { message: 'הקובץ נשמר לתלמיד' };
  }

  async getFilesForStudent(username: string) {
    const files: IFileType[] = await this.files.find({ username }).toArray();

    files.forEach((file) => {
      if (file.fileType === 'link') return file;
      const id = extractGoogleFileId(file.url);
      file.url = `https://drive.google.com/uc?export=download&id=${id}`;
    });

    return files;
  }
}
