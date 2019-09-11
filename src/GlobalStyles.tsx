import React from 'react';
import { Global, css } from '@emotion/core';

const globalStyles = `
html, body, #root {
  height: 100vh;
  width: 100vw;
  overflow-x: hidden;
  overflow-y: auto;
  overflow-scroll: touch;
  -webkit-overflow-scroll: touch;
  * {
    ::-webkit-scrollbar {
      height: 5px;
      width: 5px;
    }
    ::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 0 transparent;
      border-radius: 4px;
    }
    ::-webkit-scrollbar-thumb {
      border-radius: 4px;
      -webkit-box-shadow: inset 0 0 15px rgba(33,33,33,0.7);
    }
  }
}
`;

const GlobalStyles: React.FC = () => (
  <Global
    styles={css`
      ${globalStyles}
    `}
  />
);

export default GlobalStyles;
