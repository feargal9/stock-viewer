import React, { useState } from 'react';
import { ThemeProvider } from 'emotion-theming';

import GlobalStyles from "./GlobalStyles";
import themes, { Theme } from "./theme";

import './App.css';
import "react-virtualized-select/styles.css";
import "react-select/dist/react-select.css";

import { Layout } from "./components";
import { StockView } from "./pages";

interface ITheme {
  type: string,
  theme: Theme
}

const App: React.FC = () => {
  const { dark, light } = themes;

  const [selectedTheme, toggleTheme] = useState<ITheme>({ type: "light", theme: light });

  const onToggleTheme = () => {
    const newTheme: ITheme = selectedTheme.type === "light"
      ? { type: "dark", theme: dark }
      : { type: "light", theme: light };
    toggleTheme(newTheme);
  }

  return (
    <ThemeProvider theme={selectedTheme.theme}>
      <GlobalStyles />
      <Layout selectedTheme={selectedTheme} onToggleTheme={onToggleTheme}>
        <StockView />
      </Layout>
    </ThemeProvider>
  )
}

export default App;