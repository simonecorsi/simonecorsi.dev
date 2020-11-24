import { createContext } from "react";

export const darkModeContext = createContext({});

export function DarkMode({children, useDarkMode}) {
  return <darkModeContext.Provider value={useDarkMode}>{children}</darkModeContext.Provider>
}
