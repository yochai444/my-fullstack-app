import { useState } from "react";
import {
  Popper,
  IconButton,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
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
import { useForm, Controller } from "react-hook-form";

interface IFormInputs {
  username: string;
  urlFiles: string;
  fileType: string;
  fileName: string;
}

export default function AddFilesButton() {
  const [open, setOpen] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInputs>({
    defaultValues: { username: "", urlFiles: "", fileType: "", fileName: "" },
  });

  const onSubmit = async (data: IFormInputs) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:3000/files/upload", data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setServerError("");
      reset();
      setOpen(false);
    } catch {
      setServerError("בעיה בהוספת קובץ חדש");
    }
  };

  return (
    <>
      <StyledButton onClick={() => setOpen((prev) => !prev)}>
        יצירת קובץ חדש
      </StyledButton>

      <Popper
        open={open}
        anchorEl={null}
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1300,
        }}
      >
        <FullScreenContainer>
          <LoginBox style={{ position: "relative" }}>
            <IconButton
              onClick={() => setOpen(false)}
              style={{ position: "absolute", top: 8, left: 8 }}
              aria-label="סגור"
            >
              <CloseIcon />
            </IconButton>

            <Title>הוסף קובץ לתלמיד</Title>

            <StyledForm onSubmit={handleSubmit(onSubmit)} noValidate>
              <StyledInput
                placeholder="שם משתמש"
                {...register("username", { required: "שדה חובה" })}
              />
              {errors.username && (
                <ErrorMessage>{errors.username.message}</ErrorMessage>
              )}
              <StyledInput
                placeholder="שם הקובץ"
                {...register("fileName", { required: "שדה חובה" })}
              />
              {errors.urlFiles && (
                <ErrorMessage>{errors.urlFiles.message}</ErrorMessage>
              )}

              <StyledInput
                placeholder="קישור לקובץ"
                {...register("urlFiles", { required: "שדה חובה" })}
              />
              {errors.urlFiles && (
                <ErrorMessage>{errors.urlFiles.message}</ErrorMessage>
              )}

              {/* סוג קובץ */}
              <Controller
                name="fileType"
                control={control}
                rules={{ required: "בחר סוג קובץ" }}
                render={({ field }) => (
                  <FormControl fullWidth sx={{ mt: 1 }}>
                    <InputLabel id="file-type-label">סוג קובץ</InputLabel>
                    <Select
                      labelId="file-type-label"
                      label="סוג קובץ"
                      {...field}
                    >
                      <MenuItem value="pdf">PDF</MenuItem>
                      <MenuItem value="png">PNG</MenuItem>
                      <MenuItem value="doc">Word</MenuItem>
                      <MenuItem value="link">link</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
              {errors.fileType && (
                <ErrorMessage>{errors.fileType.message}</ErrorMessage>
              )}

              {serverError && <ErrorMessage>{serverError}</ErrorMessage>}

              <StyledButton type="submit">צור קובץ</StyledButton>
              <StyledButton type="button" onClick={() => setOpen(false)}>
                יציאה
              </StyledButton>
            </StyledForm>
          </LoginBox>
        </FullScreenContainer>
      </Popper>
    </>
  );
}
