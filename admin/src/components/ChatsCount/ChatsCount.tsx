import React, { FC } from "react";
import { Box, Flex, Typography } from "@strapi/design-system";

interface IProps {
  count: number;
}

const ChatsCount: FC<IProps> = ({ count }) => {
  return (
    <Box background="neutral0" hasRadius={true} shadow="filterShadow">
      <Flex justifyContent="left" padding={4}>
        <Typography variant="Typography">
          You have a total of {count} chats 🚀
        </Typography>
      </Flex>
    </Box>
  );
};

export default ChatsCount;
