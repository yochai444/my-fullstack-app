import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import StudentPage from "./StudentPage";
import AdminPage from "./AdminPage";

interface IUserToken {
  role: string;
  name: string;
  sub: string;
}

export default function MainPage() {
  const navigate = useNavigate();
  const [userToken, setUserToken] = useState<IUserToken | null>(null);

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token");

      const decoded = jwtDecode<IUserToken>(token);
      setUserToken(decoded);
    } catch (err) {
      navigate("/login");
    }
  }, [navigate]);

  if (!userToken) return null;

  if (userToken.role === "student") return <StudentPage />;
  if (userToken.role === "admin") return <AdminPage />;
  return null;
}
