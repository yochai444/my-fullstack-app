import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Db, MongoClient } from 'mongodb';
import { UserService } from './user.service';
import { Files, User } from 'src/types/userTypes';

@Injectable()
export class FilesService {
  private files;

  constructor(
    @Inject('MONGO_CLIENT') private readonly client: MongoClient,
    private readonly userService: UserService  // ← הכנס לכאן
  ) {
    const dbName = process.env.MONGO_DB_NAME;
    this.files = this.client.db(dbName).collection<Files>('files');
  }

  async uploadForStudent(username: string, url: string) {
    const student = await this.userService.findByUsername(username);
    if (!student) throw new NotFoundException('תלמיד לא קיים');

    await this.files.insertOne({
      studentId: student._id.toString(),
      username,
      url,
      uploadedAt: new Date(),
    });

    return { message: 'הקובץ נשמר לתלמיד' };
  }

  async getFilesForStudent(studentId: string) {
    return this.files.find({ studentId }).toArray();
  }
}
