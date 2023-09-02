import { Image } from "@chakra-ui/image";
import { Box, Container, Flex, Text } from "@chakra-ui/layout";
import React from "react";
import Youtube from "../assets/images/youtube.png";
import Facebook from "../assets/images/facebook.png";
import Linkedin from "../assets/images/linkedin.png";
import Logo from "../assets/images/logo.png";

function Footer() {
  return (
    <Container
      maxW="full"
      h="30vh"
      display="flex"
      color="white"
      alignItems="center"
      justifyContent="space-around"
      backgroundColor="#1DB1CB"
    >
      <Flex gap="20px">
        <Image src={Youtube} />
        <Image src={Facebook} />
        <Image src={Linkedin} />
      </Flex>
      <Flex gap="70px">
        <Text>Privacy policy</Text>
        <Text>Terms & Conditions</Text>
        <Text>About</Text>
      </Flex>
      <Box bg="white">
        <Image src={Logo} w="200px" h="100px" />
      </Box>
    </Container>
  );
}

export default Footer;
