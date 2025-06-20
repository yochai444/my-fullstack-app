import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StudentPage from "./StudentPage";
import AdminPage from "./AdminPage";

export interface IUserToken {
  role: string;
  name: string;
  sub: string;
}

interface MainPageProps {
  userToken: IUserToken;
}

export default function MainPage({ userToken }: MainPageProps) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!userToken?.role) navigate("/login");
    return;
  }, [userToken, navigate]);

  if (userToken?.role === "student") return <StudentPage />;
  if (userToken?.role === "admin") return <AdminPage />;
  return;
}
