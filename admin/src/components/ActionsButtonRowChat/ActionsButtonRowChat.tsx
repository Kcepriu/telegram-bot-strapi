import React, { FC, Dispatch, SetStateAction } from "react";
import { Flex, Button, IconButton, Box } from "@strapi/design-system";
import { Trash, Pencil } from "@strapi/icons";

interface IProps {
  isEdit: boolean;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  handleSaveChat: () => void;
  handleDeleteChat: () => void;
}

const ActionsButtonRowChat: FC<IProps> = ({
  isEdit,
  setIsEdit,
  handleSaveChat,
  handleDeleteChat,
}) => {
  return (
    <>
      {isEdit ? (
        <Flex style={{ justifyContent: "end" }}>
          <Button onClick={handleSaveChat}>Save</Button>
        </Flex>
      ) : (
        <Flex style={{ justifyContent: "end" }}>
          <IconButton
            onClick={() => setIsEdit(true)}
            label="Edit"
            noBorder
            icon={<Pencil />}
          />

          <Box paddingLeft={1}>
            <IconButton
              onClick={() => handleDeleteChat()}
              label="Delete"
              noBorder
              icon={<Trash />}
            />
          </Box>
        </Flex>
      )}
    </>
  );
};

export default ActionsButtonRowChat;
