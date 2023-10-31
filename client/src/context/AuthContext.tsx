import { createContext, useEffect, useState } from "react";
import Auth from "../utils/Auth";

export type AuthContextType = {
  isLoggedIn: boolean | null;
  setLoggedIn: (value: boolean) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

const AuthContextProvider = ({ children }: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    Auth().then((res) => res && setIsLoggedIn(res));
  }, []);

  const setLoggedIn = (value: boolean) => {
    setIsLoggedIn(value);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, setLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
