import React from "react";
import { Flex, Box } from "rebass";



const Footer: React.FC = () => {
  return (
    <Flex flexDirection="row" bg="background" width={1}>
      <Box as="footer" bg="background" sx={{ minHeight: "50px" }} />
    </Flex >
  )
}

export default Footer;