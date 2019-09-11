import React from 'react';
import { Box } from 'rebass';

import { Theme } from '../theme';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: JSX.Element;
  selectedTheme: ThemeType;
  onToggleTheme(): void;
}

interface ThemeType {
  type: string;
  theme: Theme;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  selectedTheme,
  onToggleTheme
}) => {
  return (
    <Box
      sx={{
        display: 'grid',
        minHeight: '100vh',
        gridTemplateAreas: [
          '"header" "nav" "main" "ads" "footer"',
          '"header header header" "nav main ads" "footer footer footer"'
        ],
        gridTemplateColumns: ['1fr', '0px 1fr 0px'],
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
        {children}
      </Box>
      <Box
        sx={{
          gridArea: 'footer'
        }}
      >
        <Footer />
      </Box>
    </Box>
  );
};

export default Layout;
