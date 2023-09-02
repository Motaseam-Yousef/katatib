import { Flex, Text } from "@chakra-ui/react";
import { handleCardClickd } from "../helper/handleCardClicked";
import { handleActivate } from "../helper/handleActivate";

function CustomCard({ title, setStep }) {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      cursor="pointer"
      backgroundColor="#9AC945"
      borderRadius="20px"
      shadow="2xl"
      p="10px"
      minW="100px"
      h="100px"
      transition="all 0.5s"
      _hover={{
        background: "white",
        color: "#9AC945",
      }}
      onClick={() => handleCardClickd(title, setStep)}
      filter={handleActivate(title) ? "" : "auto"}
      blur={handleActivate(title) ? "" : "2px"}
    >
      <Text fontSize="30px" fontWeight="bold">
        {title}
      </Text>
    </Flex>
  );
}

export default CustomCard;
