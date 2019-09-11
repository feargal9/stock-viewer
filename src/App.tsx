import React, { useState } from 'react';
import { ThemeProvider } from 'emotion-theming';

import GlobalStyles from './GlobalStyles';
import themes, { Theme } from './theme';

import './App.css';
import 'react-virtualized-select/styles.css';
import 'react-select/dist/react-select.css';

import { Layout } from './components';
import { StockView } from './pages';

interface ThemeState {
  type: string;
  theme: Theme;
}

const App: React.FC = () => {
  const { dark, light } = themes;

  const [selectedTheme, toggleTheme] = useState<ThemeState>({
    type: 'light',
    theme: light
  });

  const onToggleTheme = (): void => {
    const newTheme: ThemeState =
      selectedTheme.type === 'light'
        ? { type: 'dark', theme: dark }
        : { type: 'light', theme: light };
    toggleTheme(newTheme);
  };

  return (
    <ThemeProvider theme={selectedTheme.theme}>
      <GlobalStyles />
      <Layout selectedTheme={selectedTheme} onToggleTheme={onToggleTheme}>
        <StockView />
      </Layout>
    </ThemeProvider>
  );
};

export default App;
