import { Box, Typography, Stack } from "@mui/material";
import StudentLogButton from "../components/StudentLoginButton";
import SidebarMenu from "../components/SidebarMenu";
import LogoButton from "../components/LogoBotton";

export default function HomePage() {
  return (
    <Box sx={{ direction: "rtl", fontFamily: "system-ui" }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        padding={2}
      >
        <LogoButton />
        <StudentLogButton />
      </Box>
      <Box
        display={"flex"}
        flexDirection={"row"}
        width={"100%"}
        height={"100%"}
        gap={2}
      >
        <Box flex={1}>
          <SidebarMenu />
        </Box>
        <Box alignItems={"center"} flex={7} padding={2}>
          <img
            src="/mishel.png"
            alt="כיתה"
            style={{ width: "100%", height: "60%", borderRadius: 8 }}
          />

          <Stack spacing={2}>
            <Typography fontFamily="system-ui" fontSize="36px">
              לומדים עם מישל
            </Typography>
            <Typography fontFamily="system-ui" fontSize="18px">
              ממשק זה מספק כלים וידע רב הן לתלמידים והן לצוות ההוראה.
            </Typography>
            <Typography fontFamily="system-ui" fontSize="18px">
              ניתן להירשם, להתחבר ולקבל גישה לתכנים מגוונים בהתאמה אישית לפי
              הרשאות.
            </Typography>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
