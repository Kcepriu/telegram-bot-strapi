import React, { FC } from "react";
import { Table, Thead, Tbody, Tr, Th } from "@strapi/design-system";
import { Box, Typography, VisuallyHidden } from "@strapi/design-system";
import RowListChats from "../RowListChats/RowListChats";

import { IChat } from "../../../../types/bot.types";

interface IProps {
  chats: IChat[];
  deleteChat: (chat: IChat) => void;
}

const ListChats: FC<IProps> = ({ chats, deleteChat }) => {
  return (
    <>
      <Box
        background="neutral0"
        hasRadius={true}
        shadow="filterShadow"
        padding={8}
        style={{ marginTop: "10px" }}
      >
        <Table colCount={4} rowCount={10}>
          <Thead>
            <Tr>
              <Th>
                <Typography variant="sigma">ID</Typography>
              </Th>

              <Th>
                <Typography variant="sigma">Chat ID</Typography>
              </Th>

              <Th>
                <Typography variant="sigma">User name</Typography>
              </Th>

              <Th>
                <Typography variant="sigma">Send information</Typography>
              </Th>

              <Th>
                <VisuallyHidden>Actions</VisuallyHidden>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {chats.map((chat) => {
              return (
                <RowListChats
                  key={chat.id}
                  chat={chat}
                  deleteChat={deleteChat}
                />
              );
            })}
          </Tbody>
        </Table>
      </Box>
    </>
  );
};

export default ListChats;
