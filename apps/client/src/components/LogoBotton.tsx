import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function LogoButton() {
  const navigate = useNavigate();
  return (
    <IconButton
      onClick={() => navigate("/")}
      sx={{
        borderRadius: "12px",
        "&:hover": {
          boxShadow: 4,
        },
      }}
    >
      <img
        src={"/Logo.png"}
        alt="Michelle's Tutoring"
        style={{
          height: 100,
          width: 100,
        }}
      />
    </IconButton>
  );
}
