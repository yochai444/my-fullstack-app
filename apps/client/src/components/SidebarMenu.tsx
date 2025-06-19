import { Box, Popper, Paper, Typography, Button } from "@mui/material";
import { useState, useRef } from "react";

type InfoType = "about" | "contact" | null;

export default function SidebarMenu() {
  const [openInfo, setOpenInfo] = useState<InfoType>(null);
  const anchorRef = useRef<HTMLDivElement | null>(null);

  const getContent = () => {
    switch (openInfo) {
      case "about":
        return "האתר נבנה כדי לספק גישה נוחה לתלמידים ומורים לתכנים לימודיים.";
      case "contact":
        return "צור קשר: support@edu.com | טלפון: 03-1234567";
      default:
        return "";
    }
  };

  return (
    <div ref={anchorRef}>
      <Box display={"flex"} flexDirection={"column"} padding={2} gap={2}>
        <Button
          onClick={() => setOpenInfo("about")}
          variant="outlined"
          color="inherit"
          sx={{
            justifyContent: "flex-start",
            padding: 2,
          }}
        >
          <Typography textAlign="right" fontFamily="system-ui">
            על האתר
          </Typography>
        </Button>
        <Button
          onClick={() => setOpenInfo("contact")}
          variant="outlined"
          color="inherit"
          sx={{ justifyContent: "flex-start", padding: 2 }}
        >
          <Typography textAlign="right" fontFamily="system-ui">
            צור קשר
          </Typography>
        </Button>
      </Box>

      <Popper
        open={!!openInfo}
        anchorEl={anchorRef.current}
        placement="right-start"
        onMouseLeave={() => setOpenInfo(null)}
      >
        <Paper sx={{ p: 2, maxWidth: 250 }}>
          <Typography>{getContent()}</Typography>
        </Paper>
      </Popper>
    </div>
  );
}
