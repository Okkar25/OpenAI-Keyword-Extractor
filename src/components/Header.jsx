import { Heading, Image, Text } from "@chakra-ui/react";
import React from "react";
import logo from "../assets/light-bulb.svg";

const Header = () => {
  return (
    <>
      <Image src={logo} alt="logo" width={100} marginBottom="1rem" />

      <Heading color="white" marginBottom="1rem">
        OpenAI Keyword Extractor
      </Heading>

      <Text fontSize={25} textAlign="center">
        Paste in your text below in the box to extract keywords for you.
      </Text>
    </>
  );
};

export default Header;
