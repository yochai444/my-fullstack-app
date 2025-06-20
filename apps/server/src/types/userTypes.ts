import { ObjectId } from 'mongodb';

export interface User {
  _id: ObjectId;
  name: string;
  password: string;
  role: 'student' | 'admin';
}

export interface Files {
  studentId: string;
  name: string;
  url: string;
  uploadedAt: Date;
}
