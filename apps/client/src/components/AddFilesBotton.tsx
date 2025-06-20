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
export default function AddFilesButton() {
  const [username, setUsername] = useState("");
  const [urlFiles, setUrlFiles] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = "http://localhost:3000/files/upload";
      const res = await axios.post(url, { username, urlFiles });
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setError("");
      handleClose();
    } catch (err) {
      setError("בעיה בהוספת קובץ חדש");
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <StyledButton onClick={() => setOpen((prev) => !prev)}>
        יצירת קובץ חדש
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
              <IconButton
                onClick={handleClose}
                style={{ position: "absolute", top: 8, left: 8 }}
                aria-label="סגור"
              >
                <CloseIcon />
              </IconButton>

              <Title>הוסף קובץ לתלמיד</Title>
              <StyledForm onSubmit={handleSubmit}>
                <StyledInput
                  placeholder="שם משתמש"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <StyledInput
                  type="fileUrl"
                  placeholder="קישור לקובץ"
                  value={urlFiles}
                  onChange={(e) => setUrlFiles(e.target.value)}
                  required
                />
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <StyledButton type="submit"> צור קובץ</StyledButton>
              </StyledForm>
            </LoginBox>
          </FullScreenContainer>
        </ClickAwayListener>
      </Popper>
    </>
  );
}
