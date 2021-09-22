import React, { createContext, useContext, useState } from "react";

const Context = createContext("");

export const useSessionIdState = () => useContext(Context);

export function SessionProvider({ children }) {
  const sessionState = useState("");

  return <Context.Provider value={sessionState}>{children}</Context.Provider>;
}
