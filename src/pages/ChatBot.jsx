import { Box, Button, Container, Flex, Input, Text } from "@chakra-ui/react";
import CustomCard from "../components/CustomCard";
import { useEffect, useState } from "react";
import { handleStepper } from "../helper/handleStepper";

function ChatBot() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({});
  const [cardInfo, setCardInfo] = useState({});

  useEffect(() => {
    if (step !== 4) {
      const info = handleStepper(step);
      setCardInfo(info);
    }
  }, [step]);
  return step !== 4 ? (
    <Container
      display="flex"
      alignItems="center"
      flexDir="column"
      pt="5vh"
      minH="100vh"
      color="#fff"
      background="#1DB1CB"
      maxW="full"
    >
      <Text fontWeight="bold" fontSize="50px" mb="70px">
        {cardInfo?.title}
      </Text>
      <Flex w="50vw" flexWrap="wrap" gap="40px">
        {cardInfo?.values?.map((info) => (
          <CustomCard
            key={`${info} - ${step}`}
            title={info}
            setData={setData}
            setStep={setStep}
          />
        ))}
      </Flex>
    </Container>
  ) : (
    <Container display="flex" minH="100vh" color="#fff" maxW="full">
      <Flex alignSelf="flex-end" gap="1vw" h="5vh">
        <Input backgroundColor="#F2F1F1" w="90vw" color="black" />
        <Button w="7vw">Send</Button>
      </Flex>
    </Container>
  );
}

export default ChatBot;
