import { useEffect, useState } from "react";

export default function HomePage() {
  const [user, setUser] = useState<{
    name: string;
    role: "student" | "admin";
  } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const payload = JSON.parse(atob(token.split(".")[1]));
    setUser(payload);
  }, []);

  return user ? (
    <div>
      <h1>Hi, {user.name}</h1>
      <p>Permissions: {user.role}</p>
    </div>
  ) : (
    <p>Loading...</p>
  );
}
