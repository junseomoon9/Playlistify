import React, { ReactNode, createContext, useState } from "react";

interface ProviderProps {
  children?: ReactNode;
}

export interface UserContextType {
  userID: string;
  setUserID: React.Dispatch<React.SetStateAction<string>>;
}

const UserContext = createContext<UserContextType | null>(null);

export default UserContext;

export const UserProvider = ({ children }: ProviderProps) => {
  const [userID, setUserID] = useState("");

  let context: UserContextType = {
    userID: userID,
    setUserID: setUserID,
  };

  return (
    <UserContext.Provider value={context}>
      {children}
    </UserContext.Provider>
  );
};
