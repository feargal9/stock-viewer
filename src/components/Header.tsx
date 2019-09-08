import React from "react";
import { Flex, Box, Text, Button } from "rebass";
import { Icon } from 'react-icons-kit';
import { statsDots } from 'react-icons-kit/icomoon/statsDots';

export const StatsIcon = () => <Box color="text"><Icon size={26} icon={statsDots} /></Box>

interface HeaderProps {
  activeTheme: string;
  toggleTheme(): void;
}

const Header: React.FC<HeaderProps> = ({ activeTheme, toggleTheme }) => {
  return (
    <Flex flexDirection="row" bg="background">
      <Box as="header" width={1} p={2} sx={{ height: "50px" }}>
        <Flex
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          height="100%"
        >
          <React.Fragment>
            <StatsIcon />
            <Text pl={3} mt={-2} fontWeight="bold" color="text">Stock Viewer</Text>
          </React.Fragment>
          <Button bg="muted" onClick={toggleTheme}>
            <Text color="text">{activeTheme}</Text>
          </Button>
        </Flex>
      </Box>
    </Flex >
  )
}

export default Header;