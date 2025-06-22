import { useEffect, useState } from "react";
import axios from "axios";
import {
  Stack,
  Card,
  CardContent,
  Typography,
  CardActionArea,
  Box,
} from "@mui/material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ImageIcon from "@mui/icons-material/Image";
import VideoFileIcon from "@mui/icons-material/VideoFile";
import LinkIcon from '@mui/icons-material/Link';
import { jwtDecode } from "jwt-decode";

interface IFileType {
  _id: string;
  studentId: string;
  username: string;
  url: string;
  uploadedAt?: string;
  fileType: string; 
  fileName: string;
}

interface IUserToken {
  role: string;
  name: string;
  sub: string;
}

function getFileIcon(fileType: string) {
  
  if (fileType === "pdf")
    return <PictureAsPdfIcon fontSize="large" color="error" />;
  if (["jpg", "jpeg", "png", "gif", "bmp", "svg", "webp"].includes(fileType))
    return <ImageIcon fontSize="large" color="primary" />;
  if (["mp4", "webm", "avi", "mov"].includes(fileType))
    return <VideoFileIcon fontSize="large" color="secondary" />;
  if (fileType === "link")
    return <LinkIcon fontSize="large" color="action" />;

  return <InsertDriveFileIcon fontSize="large" />;
}

export default function StudentPage() {
  const [files, setFiles] = useState<IFileType[]>([]);
  let userToken: IUserToken | null = null;

  try {
    const token = localStorage.getItem("token");
    if (token) {
      userToken = jwtDecode<IUserToken>(token);
    }
  } catch {
    userToken = null;
  }

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/files/my", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFiles(response.data);
      } catch (error) {
        console.error("שגיאה בקבלת הקבצים:", error);
      }
    };

    fetchFiles();
  }, []);

  if (!userToken) {
    return (
      <Box padding={4}>
        <Typography>משתמש לא מחובר</Typography>
      </Box>
    );
  }

  return (
    <>
      <Box sx={{ direction: "rtl", fontFamily: "system-ui" }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          padding={2}
        >
          <Typography variant="h5" fontFamily="system-ui" fontSize="24px">
            {`היי ${userToken.name}`}
          </Typography>
        </Box>
      </Box>
      <Stack flexWrap="wrap" gap={2} padding={2} justifyContent="center">
        {files.map((f) => (
          <Card key={f._id} sx={{ width: 200 }}>
            <CardActionArea href={f.url} target="_blank" rel="noreferrer">
              <CardContent sx={{ textAlign: "center" }}>
                <Box mb={1}>{getFileIcon(f.fileType)}</Box>
                <Typography variant="body1" noWrap>
                  {f.fileName }
                </Typography>
                {f.uploadedAt && (
                  <Typography variant="caption" color="textSecondary">
                    {new Date(f.uploadedAt).toLocaleDateString()}
                  </Typography>
                )}
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Stack>
    </>
  );
}
