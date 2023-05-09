import { createContext } from 'react';
import Themes from '../themes';

export interface ThemeInterface {
  id: number;
  name: string;
  copy: string;
  disconnect: string;
  sender: string;
  senderText: string;
  peer: string;
  peerText: string;
  headerBackground: string;
  headerTextColor: string;
  borderColor: string;
  borderWidth: string;
  sendButtonFileName: string;
  chatBackgroundColor: string;
  chatBorderRadius: string;
  topSectionBottomBorderWidth: string;
  typingAreaBackgroundColor: string;
  typingAreaBottomBorder: string;
  typingAreaTopBorder: string;
  inputTextColor: string;
  typingAreaInnerBorderColor: string;
  borderTopLeftRadius: string;
  borderTopRightRadius: string;
  borderBottomLeftRadius: string;
  borderBottomRightRadius: string;
  backgroundThemeName: string;
  systemMessageColor: string;
}

interface ThemesContextType {
  selectedTheme: ThemeInterface;
  setSelectedTheme: (theme: ThemeInterface) => void;
}

const ThemesContext = createContext<ThemesContextType>({
   selectedTheme: Themes[0],
   setSelectedTheme: () => {}
});

export default ThemesContext
