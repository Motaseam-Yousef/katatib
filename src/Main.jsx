import React from "react";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";

function Main() {
  return (
    <ChakraProvider>
      <App />
    </ChakraProvider>
  );
}

export default Main;
