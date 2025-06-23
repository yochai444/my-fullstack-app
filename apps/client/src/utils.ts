export interface IFileType {
    _id: string;
    studentId: string;
    username: string;
    url: string;
    uploadedAt?: string;
    fileType: string;
    fileName: string;
    folder?: string | null;
  }
  
  export interface IUserToken {
    role: string;
    name: string;
    sub: string;
  }
  