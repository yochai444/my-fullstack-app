import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StudentPage from "./StudentPage";
import AdminPage from "./AdminPage";
import LoginPage from "./LoginPage";

type Props = {
  userToken: {
    role?: string;
    name?: string;
  } | null;
};

export default function MainPage({ userToken }: Props) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!userToken?.role) 
      navigate("/login");
        return;
  }, [userToken, navigate]);

  if (userToken?.role === "student") return <StudentPage />;
  if (userToken?.role === "admin") return <AdminPage />;
  return null; 
}
