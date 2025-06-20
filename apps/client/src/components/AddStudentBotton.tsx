import { useState } from "react";
import { Popper, ClickAwayListener, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  ErrorMessage,
  FullScreenContainer,
  LoginBox,
  StyledButton,
  StyledForm,
  StyledInput,
  Title,
} from "../pages/Login.styled";
import axios from "axios";

export default function AddStudentButton() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = "http://localhost:3000/users/create";
      const res = await axios.post(url, { username, password });
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setError("");
      handleClose();
    } catch (err) {
      setError("בעיה ביצירת משתמש חדש");
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <StyledButton onClick={() => setOpen((prev) => !prev)}>
        יצירת משתמש חדש
      </StyledButton>

      <Popper
        open={open}
        anchorEl={null}
        modifiers={[]}
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1300,
        }}
      >
        <ClickAwayListener onClickAway={handleClose}>
          <FullScreenContainer>
            <LoginBox style={{ position: "relative" }}>
              {/* כפתור סגירה */}
              <IconButton
                onClick={handleClose}
                style={{ position: "absolute", top: 8, left: 8 }}
                aria-label="סגור"
              >
                <CloseIcon />
              </IconButton>

              <Title>יצירת משתמש חדש</Title>
              <StyledForm onSubmit={handleSubmit}>
                <StyledInput
                  placeholder="שם משתמש"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <StyledInput
                  type="password"
                  placeholder="סיסמה"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <StyledButton type="submit">צור משתמש</StyledButton>
              </StyledForm>
            </LoginBox>
          </FullScreenContainer>
        </ClickAwayListener>
      </Popper>
    </>
  );
}
