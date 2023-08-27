import React, { FC, useState } from "react";
import { Tr, Td, Alert } from "@strapi/design-system";
import { Typography, Switch, TextInput } from "@strapi/design-system";
import ActionsButtonRowChat from "../ActionsButtonRowChat/ActionsButtonRowChat";
import botRequest from "../../api/botRequest";

import { IChat } from "../../../../types/bot.types";
import { useShowAlerts, TypeAlarm } from "../../hooks/useShowAlerts";

interface IProps {
  chat: IChat;
  deleteChat: (chat: IChat) => void;
}

interface IParamsTextInput {
  value: string;
  onChange: (e: any) => void;
}

const ChatTextInput: FC<IParamsTextInput> = ({ value, onChange }) => {
  return (
    <TextInput
      type="text"
      aria-label="chat-input"
      name="chat-input"
      // error={value.length > 40 ? "Text should be less than 40 characters" : ""}
      onChange={onChange}
      value={value}
    />
  );
};

const RowListChats: FC<IProps> = ({ chat, deleteChat }) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const [clientName, setClientName] = useState<string>(chat.clientName);
  const [isSendInformation, setISendInformation] = useState<boolean>(
    chat.isSendInformation
  );

  const { Alerts, handleAddAlarm } = useShowAlerts();

  // * Handle
  const handleSaveChat = async () => {
    const { id, ...newChat } = { ...chat, clientName, isSendInformation };

    if (!id) return;

    try {
      const response = await botRequest.updateChat(id, newChat);
      if (response) setIsEdit(false);
    } catch {
      handleAddAlarm({ type: TypeAlarm.danger, text: "Error save data" });
    }
  };

  const handleDeleteChat = async () => {
    await deleteChat(chat);
  };

  const handleIsSendInformation = () => {
    setISendInformation((prev) => !prev);
  };

  return (
    <>
      <Alerts />
      <Tr>
        <Td>
          <Typography textColor="neutral800">{chat.id}</Typography>
        </Td>
        <Td>
          <Typography textColor="neutral800">{chat.chatId}</Typography>
        </Td>
        <Td>
          {isEdit ? (
            <ChatTextInput
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
            />
          ) : (
            <Typography textColor="neutral800">{clientName}</Typography>
          )}
        </Td>
        <Td>
          <Switch
            selected={isSendInformation}
            onChange={handleIsSendInformation}
            disabled={!isEdit}
          />
        </Td>

        <Td>
          <ActionsButtonRowChat
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            handleSaveChat={handleSaveChat}
            handleDeleteChat={handleDeleteChat}
          />
        </Td>
      </Tr>
    </>
  );
};

export default RowListChats;
