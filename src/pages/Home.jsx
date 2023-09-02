import {
  Container,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Image,
  Box,
  Flex,
  Text,
} from "@chakra-ui/react";
import Logo from "../assets/images/logo.png";
import mikiImage from "../assets/images/miki.png";
import mikiIcon from "../assets/images/small-miki.png";
import TeacherImage from "../assets/images/teacher.png";
import FeatureImg from "../assets/images/feature-1.png";
import nextArrowImage from "../assets/images/arrow_forward_ios.png";
import prevArrowImage from "../assets/images/arrow_back_ios.png";
import Slider from "react-slick";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "video-react/dist/video-react.css";
import Footer from "../components/Footer";

function Home() {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  useEffect(() => {
    const isModalShown = localStorage.getItem("isModalShown");

    if (!isModalShown) {
      onOpen();

      localStorage.setItem("isModalShown", "true");
    }
  }, []);

  const CustomNextArrow = (props) => (
    <img
      src={nextArrowImage}
      alt="Next"
      onClick={props.onClick}
      className="slick-next"
      style={{ width: "auto" }}
    />
  );

  const CustomPrevArrow = (props) => (
    <img
      src={prevArrowImage}
      alt="Previous"
      onClick={props.onClick}
      className="slick-prev"
      style={{ width: "auto" }}
    />
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: (dots) => (
      <Box
        position={"unset !important"}
        pt={"20px !important"}
        textAlign="center"
      >
        <ul style={{ margin: "0" }}>{dots}</ul>
      </Box>
    ),
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };

  const textData = [
    "Slide 1: Lorem ipsum dolor sit amet.",
    "Slide 2: Consectetur adipiscing elit.",
    "Slide 3: Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  ];

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size={"lg"}>
        <ModalOverlay />
        <ModalContent borderRadius={10}>
          <ModalCloseButton />

          <ModalBody border="1px solid #9AC945" borderRadius={10}>
            <Flex
              direction={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              gap={"2rem"}
              p={10}
            >
              <Image src={mikiImage} alt="miki" />
              <Text fontSize={48}>Hi, I’m Miki</Text>
              <Link variant="ghost" to="/chat-bot">
                <Text
                  fontSize={40}
                  backgroundColor={"#9AC945"}
                  color={"#fff"}
                  paddingX={"10"}
                >
                  Let’s talk
                </Text>
              </Link>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Box
        bg={"#fff"}
        color={"#000"}
        p={4}
        position={"absolute"}
        zIndex={"999"}
        w={"full"}
      >
        <Container maxW={"container.xl"}>
          <Flex align="center" justifyContent={"space-between"}>
            {/* Logo */}
            <Box>
              <Link href="/" fontSize="2xl" fontWeight="bold">
                <Image src={Logo} w="200px" h="100px" />
              </Link>
            </Box>

            {/* Navigation Links */}
            <Flex justifyContent={"center"} alignItems={"center"} gap={"5rem"}>
              <Link href="/home" mr={4}>
                Home
              </Link>
              <Link href="/about" mr={4}>
                About
              </Link>
              <Link href="/how-to" mr={4}>
                How to
              </Link>
              <Link href="/contact">
                <Text
                  bgColor={"#9AC945"}
                  paddingX={10}
                  paddingY={3}
                  color={"#fff"}
                  transition="all 0.3s ease-in-out"
                  _hover={{
                    bgColor: "#1DB1CB",
                  }}
                >
                  Contact
                </Text>
              </Link>
            </Flex>
          </Flex>
        </Container>
      </Box>
      <Container
        maxWidth={"full"}
        w="full"
        h={"100vh"}
        bgGradient="linear(to-r, #9AC945, #1DB1CB)"
        position={"relative"}
      >
        <Container maxW={"container.xl"} h={"full"}>
          <Image src={TeacherImage} position={"absolute"} bottom={"0"} />
          <Flex
            justifyContent={"center"}
            alignItems={"flex-end"}
            flexDirection={"column"}
            h={"full"}
            gap={"1.5rem"}
          >
            <Text fontSize={"40"} color={"#fff"} fontWeight={"bold"}>
              Are you looking for a teacher?
            </Text>
            <Text color={"#fff"} fontSize={"24"}>
              Or do you have educational services for students?
            </Text>
            <Link to="/chat-bot">
              <Text
                bgColor={"#9AC945"}
                border={"2px solid #9AC945"}
                paddingX={10}
                paddingY={3}
                color={"#fff"}
                transition="all 0.3s ease-in-out"
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                gap={"1rem"}
                fontSize={"24"}
                _hover={{
                  bgColor: "transparent",
                }}
              >
                Try Miki
                <Image src={mikiIcon} />
              </Text>
            </Link>
          </Flex>
        </Container>
      </Container>

      <Container maxW={"container.xl"} my={20}>
        <Box>
          <Slider {...settings}>
            {textData.map((text, index) => (
              <Box
                key={index}
                display={"flex !important"}
                flexDirection={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                width="100%"
                gap={"1.5rem"}
              >
                {/* <Center h="200px"> */}
                <Image src={FeatureImg} justifySelf={"center"} />
                <Text color={"#000"} fontSize={"24"} fontWeight={"bold"}>
                  {text}
                </Text>
                <Text fontSize={"16"}>
                  Katatib brings together students and teachers in a new, smart,
                  simple, and tidy way that is far from complicated
                </Text>
                {/* </Center> */}
              </Box>
            ))}
          </Slider>
        </Box>
      </Container>

      <Container maxW="full" p={"0"}>
        <iframe
          src="https://www.veed.io/embed/914ec84a-f254-4c43-9654-a03c37be01e8"
          width="100%"
          height="600px"
          title="[Scene- A classroom bustling with students, the te-720p-230901"
          allowFullScreen
        ></iframe>
      </Container>
      <Footer />
    </>
  );
}

export default Home;
