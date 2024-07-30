import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import logo from "../assets/openai.png";

const Footer = () => {
  return (
    <Box marginTop={50}>
      <Flex alignItems="center">
        <Image src={logo} marginRight={2} />
        <Text>Powered by Open AI</Text>
      </Flex>
    </Box>
  );
};

export default Footer;
