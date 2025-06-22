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
import { useForm } from "react-hook-form";

interface IFormInputs  {
  username: string;
  password: string;
};

export default function AddStudentButton() {
  const [open, setOpen] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInputs>();

  const onSubmit = async (data: IFormInputs) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("http://localhost:3000/users/create", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setServerError("");
      reset();
      setOpen(false);
    } catch {
      setServerError("בעיה ביצירת משתמש חדש");
    }
  };

  return (
    <>
      <StyledButton onClick={() => setOpen((prev) => !prev)}>
        יצירת משתמש חדש
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
        <ClickAwayListener onClickAway={() => setOpen(false)}>
          <FullScreenContainer>
            <LoginBox style={{ position: "relative" }}>
              <IconButton
                onClick={() => setOpen(false)}
                style={{ position: "absolute", top: 8, left: 8 }}
                aria-label="סגור"
              >
                <CloseIcon />
              </IconButton>

              <Title>יצירת משתמש חדש</Title>
              <StyledForm onSubmit={handleSubmit(onSubmit)} noValidate>
                <StyledInput
                  placeholder="שם משתמש"
                  {...register("username", { required: "שדה חובה" })}
                />
                {errors.username && (
                  <ErrorMessage>{errors.username.message}</ErrorMessage>
                )}

                <StyledInput
                  type="password"
                  placeholder="סיסמה"
                  {...register("password", { required: "שדה חובה" })}
                />
                {errors.password && (
                  <ErrorMessage>{errors.password.message}</ErrorMessage>
                )}

                {serverError && <ErrorMessage>{serverError}</ErrorMessage>}

                <StyledButton type="submit">צור משתמש</StyledButton>
              </StyledForm>
            </LoginBox>
          </FullScreenContainer>
        </ClickAwayListener>
      </Popper>
    </>
  );
}
