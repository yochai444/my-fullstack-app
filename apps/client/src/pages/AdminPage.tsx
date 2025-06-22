import { Box, Typography } from "@mui/material";
import AddStudentButton from "../components/AddStudentBotton";
import AddFilesButton from "../components/AddFilesBotton";
import { jwtDecode } from "jwt-decode";
import type { IUserToken } from "../utils";


export default function AdminPage() {
  let userToken: IUserToken | null = null;

  try {
    const token = localStorage.getItem("token");
    if (token) {
      userToken = jwtDecode<IUserToken>(token);
    }
  } catch {
    userToken = null;
  }

  if (!userToken) {
    return (
      <Box padding={4}>
        <Typography>משתמש לא מחובר</Typography>
      </Box>
    );
  }

  return (
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
        <Box display="flex" gap={2}>
          <AddStudentButton />
          <AddFilesButton />
        </Box>
      </Box>
    </Box>
  );
}
