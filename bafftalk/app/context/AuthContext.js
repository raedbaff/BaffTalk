"use client";

import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [GlobalUser, setGlobalUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const fetchUserInfo = async () => {
    try {
      const response = await fetch(`${backendUrl}/user`, {
        credentials: "include",
      });
      const data = await response.json();

      // const fullUserDataResponse = await fetch(
      //   `${backendUrl}/user/${data.user.profile.id}`
      // );
      // const userData = await fullUserDataResponse.json();
      setGlobalUser(data.user);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      setGlobalUser(null);
    }
  };
  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <AuthContext.Provider
      value={{ GlobalUser, loading, fetchUserInfo, setGlobalUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export function useAuth() {
  return useContext(AuthContext);
}
