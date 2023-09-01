import { Box, Button, Container, Flex, Input, Text } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { onSubmit } from "../helper/handleBotInputs";

function Bot() {
  // states
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  // refs
  const inputRef = useRef();
  // useEffects
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return (
    <Container
      display="flex"
      flexDir="column"
      minH="100vh"
      color="#fff"
      maxW="full"
    >
      <Flex
        w="full"
        p="20px"
        flexDir="column"
        h="95vh"
        borderLeft="1px solid #1DB1CB"
        borderRight="1px solid #1DB1CB"
        color="black"
      >
        {messages?.map((item, index) => (
          <Flex
            justifyContent={item?.from === "bot" ? "flex-end" : "flex-start"}
            key={`${item?.message} - ${index}`}
          >
            <Box
              background="#f5f5f5"
              w="200px"
              h="fit-content"
              p="10px"
              position="relative"
              className={`text-box text-${item?.from}`}
            >
              <Text>{item?.message}</Text>
            </Box>
          </Flex>
        ))}
      </Flex>
      <Flex marginTop="auto" h="5vh" w="100vw" gap="2vw">
        <Input
          backgroundColor="#F2F1F1"
          w="90vw"
          color="black"
          ref={inputRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button w="5vw" onClick={() => onSubmit(text, setMessages, setText)}>
          Send
        </Button>
      </Flex>
    </Container>
  );
}

export default Bot;
