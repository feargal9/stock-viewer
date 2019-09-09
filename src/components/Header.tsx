import React from "react";
import { Flex, Box, Text, Button } from "rebass";
import { Icon } from 'react-icons-kit';
import { statsDots } from 'react-icons-kit/icomoon/statsDots';
import { redo } from 'react-icons-kit/icomoon/redo';

const StatsIcon = () => <Box color="background"><Icon size={26} icon={statsDots} /></Box>;
const ThemeToggleIcon = () => <Box color="background"><Icon size={12} icon={redo} /></Box>

interface HeaderProps {
  activeTheme: string;
  toggleTheme(): void;
}

const Header: React.FC<HeaderProps> = ({ activeTheme, toggleTheme }) => {
  return (
    <Flex flexDirection="row" bg="text">
      <Box as="header" width={1} p={2} sx={{ height: "50px" }}>
        <Flex
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          height="100%"
        >
          <React.Fragment>
            <StatsIcon />
            <Text pl={3} mt={-2} fontWeight="bold" color="background">Stock Viewer</Text>
          </React.Fragment>
          <Button bg="text" onClick={toggleTheme}>
            <ThemeToggleIcon />
            <Text color="bg">{activeTheme === "light" ? "Dark" : "Light"}</Text>
          </Button>
        </Flex>
      </Box>
    </Flex >
  )
}

export default Header;