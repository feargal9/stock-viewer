import React from "react";
import { Flex, Box, Text } from "rebass";
import { keyframes } from "@emotion/core";
import styled from '@emotion/styled'
import { Icon } from 'react-icons-kit';
import { spinner8 } from 'react-icons-kit/icomoon/spinner8';

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const RotatingSpinner = styled(Box)`
  display: inline-block;
  animation-name: ${spin};
  animation-duration: 2s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
`;

interface LoaderProps {
  message?: string;
}

const Loader: React.FC<LoaderProps> = ({ message = "" }) => {
  return (
    <Flex flexDirection="column" alignItems="center" justifyContent="center">
      <RotatingSpinner>
        <Icon size={48} icon={spinner8} />
      </RotatingSpinner>
      {message && (
        <Text pt={2}>{message}</Text>
      )}
    </Flex>
  );
}

export default Loader;