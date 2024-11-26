import React, { useState } from "react";
import { Heading, Text, Modal, Flex, Box, Loader } from "rimble-ui";
import ModalCard from "./ModalCard";
import { useStore } from "../../store/store";

const LoadingsAssetsModal = props => {
  const { dispatch } = useStore();
  const [modalOpen, setModalOpen] = useState(true);

  const closeModal = () => {
    setModalOpen(false);
    dispatch({ type: "disconnect" });
  };

  const renderContent = () => {
    return (
      <React.Fragment>
        <Heading.h2 my={3}>Loading your assets</Heading.h2>

        <Text my={4}>We are reading your different assets from blockchain</Text>

        <Box bg={"#f6f6fc"} p={3} display={["none", "block"]}>
          <Flex alignItems={"center"}>
            <Box position={"relative"} width={"4em"}>
              <Box>
                <Loader size={"3em"} />
              </Box>
            </Box>
            <Box>
              <Text fontWeight={4}>This might take a few seconds...</Text>
            </Box>
          </Flex>
        </Box>
      </React.Fragment>
    );
  };

  return (
    <Modal isOpen={modalOpen}>
      <ModalCard closeFunc={closeModal}>
        <ModalCard.Body>{renderContent()}</ModalCard.Body>
      </ModalCard>
    </Modal>
  );
};

export default LoadingsAssetsModal;
