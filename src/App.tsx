import React, { useState } from 'react';
import { ThemeProvider } from 'emotion-theming';
import { Box } from "rebass";
import GlobalStyles from "./GlobalStyles";
import themes, { Theme } from "./theme";
import './App.css';

import { Header } from "./components";
import { StockView } from "./pages";

interface ITheme {
  type: string,
  theme: Theme
}

const App: React.FC = () => {
  const { dark, light } = themes;
  const [selectedTheme, toggleTheme] = useState<ITheme>({ type: "light", theme: light });
  // return (
  //   <ThemeProvider theme={theme}>
  //     <GlobalStyles />
  //     <Header />
  //     <StockView />
  //   </ThemeProvider>
  // );
  const onToggleTheme = () => {
    const newTheme: ITheme = selectedTheme.type === "light"
      ? { type: "dark", theme: dark }
      : { type: "light", theme: light };
    toggleTheme(newTheme);
  }

  return (
    <ThemeProvider theme={selectedTheme.theme}>
      <GlobalStyles />
      <Box
        sx={{
          display: 'grid',
          minHeight: '100vh',
          gridTemplateAreas: [
            '"header" "nav" "main" "ads" "footer"',
            '"header header header" "nav main ads" "footer footer footer"'
          ],
          gridTemplateColumns: [
            '1fr',
            '0px 1fr 0px'
          ],
          gridTemplateRows: [
            'min-content min-content 1fr min-content min-content',
            'min-content 1fr min-content'
          ]
        }}
      >
        <Box
          sx={{
            gridArea: 'header'
          }}
        >
          <Header activeTheme={selectedTheme.type} toggleTheme={onToggleTheme} />
        </Box>
        <Box
          width={1}
          sx={{
            gridArea: 'main'
          }}
        >
          <StockView />
        </Box>
        {/* <Box
          sx={{
            gridArea: 'footer'
          }}
        >
          Footer
        </Box> */}
      </Box>
    </ThemeProvider>
  )
}

export default App;