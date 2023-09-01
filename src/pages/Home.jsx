import { Center, Container } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <Container w="full" h="full">
      <Center>Home Page</Center>
      <Center color="blue">
        <Link to="/chat-bot">let's start</Link>
      </Center>
    </Container>
  );
}

export default Home;
