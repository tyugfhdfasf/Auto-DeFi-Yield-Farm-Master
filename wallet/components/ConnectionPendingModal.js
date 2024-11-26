import React from "react";
import { Heading, Text, Modal, Flex, Box, Loader } from "rimble-ui";
import ModalCard from "./ModalCard";
import { useStore } from "../../store/store";

const ConnectionPendingModal = (props) => {
  const { state, dispatch } = useStore();
  let modals = state.modals;

  const closeModal = () => {
    modals.connectionPending = false;
    dispatch({ type: "setModals", modals });
  };

  const renderContent = () => {
    return (
      <React.Fragment>
        <Heading.h2 my={3}>Connect your wallet</Heading.h2>

        <Text my={4}>Confirm the request from your {state.wallet} wallet</Text>

        <Box bg={"#f6f6fc"} p={3} display={["none", "block"]}>
          <Flex alignItems={"center"}>
            <Box position={"relative"} width={"4em"}>
              <Box>
                <Loader size={"3em"} />
              </Box>
            </Box>
            <Box>
              <Text fontWeight={4}>Waiting for connection confirmation...</Text>
              <Text fontWeight={2}>This won’t cost you any Ether</Text>
            </Box>
          </Flex>
        </Box>
      </React.Fragment>
    );
  };

  return (
    <Modal isOpen={modals.connectionPending}>
      <ModalCard closeFunc={closeModal}>
        <ModalCard.Body>{renderContent()}</ModalCard.Body>
      </ModalCard>
    </Modal>
  );
};

export default ConnectionPendingModal;
