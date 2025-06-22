import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StyledButton } from "../pages/Login.styled";

export default function StudentLogButton() {
  const [open, setOpen] = useState(false);
  const nav = useNavigate();

  if (open) nav("/login");

  return (
    <StyledButton onClick={() => setOpen((prev) => !prev)}>כניסה</StyledButton>
  );
}
