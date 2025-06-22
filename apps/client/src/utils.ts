export interface IFileType {
    _id: string;
    studentId: string;
    username: string;
    url: string;
    uploadedAt?: string;
    fileType: string;
    fileName: string;
  }
  
  export interface IUserToken {
    role: string;
    name: string;
    sub: string;
  }
  