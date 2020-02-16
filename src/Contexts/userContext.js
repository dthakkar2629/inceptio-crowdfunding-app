import React from 'react'
import { createContext } from "react";
import { useLocalStorageState } from "../Hooks/useLocalStorageState";
export const UserContext = createContext();

export function UserProvider(props) {
  const [userLocal, setUserLocal] = useLocalStorageState("user", "");
  return (
    <UserContext.Provider
      value={{ userLocal, setUserLocal}}
    >
      {props.children}
    </UserContext.Provider>
  )
}