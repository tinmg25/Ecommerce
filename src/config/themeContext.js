import { createContext } from 'react';

export const themes = {
  light: {
    background: '#ffffff',
    color: '#000000',
  },
  dark: {
    background: '#000000',
    color: '#ffffff',
  },
};

const themeContext = createContext(themes.light);

export default themeContext;
