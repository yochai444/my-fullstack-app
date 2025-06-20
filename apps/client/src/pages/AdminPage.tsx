import { Box, Typography } from "@mui/material";
import type { IUserToken } from "./MainPage";
import AddStudentButton from "../components/AddStudentBotton";
import AddFilesButton from "../components/AddFilesBotton";
export default function AdminPage() {
  const userToken = JSON.parse(
    localStorage.getItem("user") || "null"
  ) as IUserToken;

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
