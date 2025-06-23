import { useEffect, useState } from "react";
import axios from "axios";
import {
  Stack,
  Card,
  CardContent,
  Typography,
  CardActionArea,
  Box,
  Collapse,
} from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { FileIcon } from "../components/FileIcon";
import type { IFileType, IUserToken } from "../utils";
import LogoButton from "../components/LogoBotton";

export default function StudentPage() {
  const [files, setFiles] = useState<IFileType[]>([]);
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({});
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

  const foldersMap: Record<string, IFileType[]> = {};
  const ungroupedFiles: IFileType[] = [];

  files.forEach((file) => {
    if (file.folder) {
      if (!foldersMap[file.folder]) foldersMap[file.folder] = [];
      foldersMap[file.folder].push(file);
    } else {
      ungroupedFiles.push(file);
    }
  });

  const toggleFolder = (folderName: string) => {
    setOpenFolders((prev) => ({
      ...prev,
      [folderName]: !prev[folderName],
    }));
  };

  return (
    <>
      <Box sx={{ direction: "rtl", fontFamily: "system-ui" }}>
        <Box display="flex" alignItems="center" padding={2} gap={2}>
          <LogoButton />
          <Typography variant="h5" fontSize="24px">
            {`היי ${userToken.name}`}
          </Typography>
        </Box>
      </Box>

      <Stack
        direction="row"
        flexWrap="wrap"
        gap={2}
        padding={2}
        justifyContent="start"
      >
        {ungroupedFiles.map((f) => (
          <Card key={f._id} sx={{ width: 200 }}>
            <CardActionArea href={f.url} target="_blank" rel="noreferrer">
              <CardContent sx={{ textAlign: "center" }}>
                <Box mb={1}>{<FileIcon fileType={f.fileType} />}</Box>
                <Typography variant="body1" noWrap>
                  {f.fileName}
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

        {Object.entries(foldersMap).map(([folderName, filesInFolder]) => (
          <Box key={folderName} sx={{ width: 200 }}>
            <Card onClick={() => toggleFolder(folderName)}>
              <CardActionArea>
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography variant="h6" noWrap>
                    📁 {folderName}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {filesInFolder.length} קבצים
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>

            <Collapse in={openFolders[folderName]} timeout="auto" unmountOnExit>
              <Stack direction="column" gap={1} mt={1}>
                {filesInFolder.map((f) => (
                  <Card key={f._id}>
                    <CardActionArea
                      href={f.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <CardContent sx={{ textAlign: "center" }}>
                        <Box mb={1}>{<FileIcon fileType={f.fileType} />}</Box>
                        <Typography variant="body2" noWrap>
                          {f.fileName}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                ))}
              </Stack>
            </Collapse>
          </Box>
        ))}
      </Stack>
    </>
  );
}
