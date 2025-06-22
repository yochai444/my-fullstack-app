import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  ErrorMessage,
  FullScreenContainer,
  LoginBox,
  StyledButton,
  StyledForm,
  StyledInput,
  Title,
} from "./Login.styled";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type FormInputs = {
  username: string;
  password: string;
};

export default function LoginPage() {
  const nav = useNavigate();
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit = async (data: FormInputs) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("http://localhost:3000/auth/login", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setServerError("");
      nav(`/${res.data.user.username}`);
    } catch (err) {
      setServerError("שם משתמש ו/או סיסמה שגויים");
    }
  };

  return (
    <FullScreenContainer>
      <LoginBox style={{ position: "relative" }}>
        <IconButton
          onClick={() => nav("/")}
          style={{ position: "absolute", top: 8, left: 8 }}
          aria-label="סגור"
        >
          <CloseIcon />
        </IconButton>

        <Title>התחברות</Title>
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

          <StyledButton type="submit">התחבר</StyledButton>
        </StyledForm>
      </LoginBox>
    </FullScreenContainer>
  );
}
