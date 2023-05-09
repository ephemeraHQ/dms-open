import { useState } from "react";
import ThemesContext from "../contexts/ThemesContext";
import Themes from "../themes";

const ThemesProvider = ({ children }) => {
  const [selectedTheme, setSelectedTheme] = useState(Themes[0]);

  return (
    <ThemesContext.Provider value={{ selectedTheme, setSelectedTheme }}>
      {children}
    </ThemesContext.Provider>
  );
};

export default ThemesProvider;
