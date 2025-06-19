import { useState } from "react";
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

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const nav = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = "http://localhost:3000/auth/login";
      const res = await axios.post(url, { username, password });

      localStorage.setItem("user", JSON.stringify(res.data.user));
      setError("");
      nav(`/:user`);
    } catch (err) {
      setError("שם משתשמ ו/או סיסמה שגויים");
    }
  };

  return (
    <FullScreenContainer>
      <LoginBox>
        <Title>התחברות</Title>
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
          <StyledButton type="submit">התחבר</StyledButton>
        </StyledForm>
      </LoginBox>
    </FullScreenContainer>
  );
}
