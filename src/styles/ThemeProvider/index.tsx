import { ThemeProvider as Provider } from '@emotion/react';
import { ReactNode } from 'react';
import GlobalStyle from '../GlobalStyle';

import theme from './theme';

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  return (
    <>
      <GlobalStyle />
      <Provider theme={theme}>{children}</Provider>
    </>
  );
};

export default ThemeProvider;
