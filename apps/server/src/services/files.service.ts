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

export function getGoogleDownloadUrl(fileId: string, fileType: string): string {
  const trimmedType = fileType.toLowerCase().trim();
  const googleDocTypes: Record<string, { base: string; format: string }> = {
    doc: {
      base: 'https://docs.google.com/document/d',
      format: 'docx',
    },
    sheet: {
      base: 'https://docs.google.com/spreadsheets/d',
      format: 'xlsx',
    },
    slide: {
      base: 'https://docs.google.com/presentation/d',
      format: 'pptx',
    },
  };

  if (trimmedType in googleDocTypes) {
    const { base, format } = googleDocTypes[trimmedType];
    return `${base}/${fileId}/export?format=${format}`;
  }

  return `https://drive.google.com/uc?export=download&id=${fileId}`;
}

@Injectable()
export class FilesService {
  private files;

  constructor(
    @Inject('MONGO_CLIENT') private readonly client: MongoClient,
    private readonly userService: UserService,
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
      if (!id) return file;
      const newUrl = getGoogleDownloadUrl(id, file.fileType);
      file.url = newUrl;
    });

    return files;
  }
}
