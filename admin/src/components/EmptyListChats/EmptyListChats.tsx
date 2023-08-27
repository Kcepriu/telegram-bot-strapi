import React, { FC } from "react";
import { EmptyStateLayout, Button } from "@strapi/design-system";
import { Refresh } from "@strapi/icons";
import Illo from "../../components/Illo/Illo";

interface IProps {
  handeRefreshListChats: () => void;
}

const EmptyListChats: FC<IProps> = ({ handeRefreshListChats }) => {
  return (
    <>
      <EmptyStateLayout
        icon={<Illo />}
        content={`You don't have any chat yet. 
                A list of chats will appear here after users connect to the bot`}
        action={
          <Button
            onClick={handeRefreshListChats}
            variant="secondary"
            startIcon={<Refresh />}
          >
            Update list chats
          </Button>
        }
      />
    </>
  );
};

export default EmptyListChats;
