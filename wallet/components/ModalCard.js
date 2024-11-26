import React from "react";
import { Box, Flex, Card, Button } from "rimble-ui";

const ModalCard = ({ children, closeFunc, ...props }) => (
  <Card
    border={0}
    mx={"auto"}
    my={"auto"}
    p={0}
    height={["100vh", "auto"]}
    width={["auto"]}
    maxWidth={"960px"}
    overflow={"hidden"}
  >
    <Box
      position={"absolute"}
      top={"0"}
      right={"0"}
      m={3}
      borderRadius={"100%"}
      bg={"white"}
    >
      <Button.Text
        icononly
        icon={"Close"}
        mainColor={"moon-gray"}
        onClick={closeFunc}
        size={"2.5rem"}
      />
    </Box>
    <Flex flexDirection={"column"} height={"100%"}>
      {children}
    </Flex>
  </Card>
);

ModalCard.Body = ({ children, ...props }) => (
  <Flex flex={"1 1 auto"} style={{ overflow: "auto" }}>
    <Box width={1} p={["4", "5"]} m={"auto"}>
      {children}
    </Box>
  </Flex>
);

ModalCard.Footer = ({ children, ...props }) => (
  <Flex
    flex={"1 0 auto"}
    justifyContent={"center"}
    borderTop={1}
    borderColor={"light-gray"}
    p={3}
  >
    {children}
  </Flex>
);

ModalCard.BackButton = ({ onClick, ...props }) => (
  <Box position={"absolute"} top={"0"} left={"0"} m={3} bg={"white"}>
    <Button.Outline
      onClick={onClick}
      icononly
      icon={"ArrowBack"}
      size={"2.5rem"}
    />
  </Box>
);

export default ModalCard;
