import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "register">("login");
  const nav = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url =
        mode === "login"
          ? "http://localhost:3000/auth/login"
          : "http://localhost:3000/auth/register";
      const res = await axios.post(url, { username, password });

      if (mode === "login") {
        localStorage.setItem("token", res.data.token);
        nav("/home");
      } else {
        alert("נרשמת בהצלחה! עכשיו תוכל להתחבר");
        setMode("login");
      }
    } catch (err) {
      alert("פעולה נכשלה. ודא שהנתונים תקינים");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto" }}>
      <h1>{mode === "login" ? "התחברות" : "הצטרפות לאתר"}</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="שם משתמש"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          placeholder="סיסמה"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{mode === "login" ? "התחבר" : "הצטרף"}</button>
      </form>

      <p style={{ marginTop: 16 }}>
        {mode === "login" ? (
          <>
            אין לך חשבון?{" "}
            <button onClick={() => setMode("register")}>הצטרף לאתר</button>
          </>
        ) : (
          <>
            כבר יש לך חשבון?{" "}
            <button onClick={() => setMode("login")}>התחבר</button>
          </>
        )}
      </p>
    </div>
  );
}
