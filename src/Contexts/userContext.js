import React from 'react'
import { createContext } from "react";
import { useLocalStorageState } from "../Hooks/useLocalStorageState";
export const UserContext = createContext();

export function UserProvider(props) {
  const [userLocal, setUserLocal] = useLocalStorageState("user", "");
  const [tokenLocal, setTokenLocal] = useLocalStorageState("token", "");
  return (
    <UserContext.Provider
      value={{ userLocal, setUserLocal, tokenLocal, setTokenLocal }}
    >
      {props.children}
    </UserContext.Provider>
  )
}