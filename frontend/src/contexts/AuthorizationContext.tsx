import React, { ReactNode, createContext, useState } from "react";

interface ProviderProps {
  children?: ReactNode;
}

export interface AuthorizationContextType {
  accessToken: string;
  setAccessToken: React.Dispatch<React.SetStateAction<string>>;
}

const AuthorizationContext = createContext<AuthorizationContextType | null>(null);

export default AuthorizationContext;

export const AuthorizationProvider = ({ children }: ProviderProps) => {
  const [accessToken, setAccessToken] = useState("");

  let context: AuthorizationContextType = {
    accessToken: accessToken,
    setAccessToken: setAccessToken,
  };

  return (
    <AuthorizationContext.Provider value={context}>
      {children}
    </AuthorizationContext.Provider>
  );
};
