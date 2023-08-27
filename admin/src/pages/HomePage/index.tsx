/*
 *
 * HomePage
 *
 */

import React, { useState, useEffect, FC } from "react";
import {
  Layout,
  BaseHeaderLayout,
  ContentLayout,
  Button,
  EmptyStateLayout,
  Link,
  Alert,
} from "@strapi/design-system";

import { LoadingIndicatorPage } from "@strapi/helper-plugin";
import { Refresh, ArrowLeft } from "@strapi/icons";
import { RiErrorWarningFill } from "react-icons/ri";

import botRequest from "../../api/botRequest";
import EmptyListChats from "../../components/EmptyListChats/EmptyListChats";
import ListChats from "../../components/ListChats/ListChats";
import ChatsCount from "../../components/ChatsCount/ChatsCount";
import QuestionYesNo from "../../components/QuestionYesNo/QuestionYesNo";

import { IChat } from "../../../../types/bot.types";
import { useShowAlerts, TypeAlarm } from "../../hooks/useShowAlerts";

const HomePage: FC = () => {
  const [chats, setChats] = useState<IChat[]>([]);
  const [botName, setBotName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isShowQuestionDelete, setIsShowQuestionDelete] =
    useState<boolean>(false);
  const [chatToProcess, setChatToProcess] = useState<IChat | null>(null);

  const { Alerts, handleAddAlarm } = useShowAlerts();

  const fetchData = async () => {
    if (isLoading === false) setIsLoading(true);

    try {
      const { username = "" } = await botRequest.getMe();
      setBotName(username);
      const response = await botRequest.geChats();
      setChats(response);
    } catch {
      handleAddAlarm({ type: TypeAlarm.danger, text: "Error fetch data" });
      setBotName("");
      setChats([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (chat: IChat | null) => {
    if (!chat) return;

    if (isLoading === false) setIsLoading(true);

    try {
      const response = await botRequest.deleteChat(chat);
      if (response)
        setChats((oldChats) =>
          oldChats.filter((chat) => chat.id !== response.id)
        );
    } catch {
      handleAddAlarm({ type: TypeAlarm.danger, text: "Error delete chat" });
    } finally {
      setIsLoading(false);
      setChatToProcess(null);
    }
  };

  const deleteChat = async (chat: IChat) => {
    setChatToProcess(chat);
    setIsShowQuestionDelete(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle
  const handeRefreshListChats = async () => {
    await fetchData();
  };

  if (isLoading) return <LoadingIndicatorPage />;

  return (
    <Layout>
      <Alerts />
      <BaseHeaderLayout
        title="Telegram Bot Plugin"
        subtitle="Send message to Telegram"
        navigationAction={
          <Link startIcon={<ArrowLeft />} to="/">
            Go back
          </Link>
        }
        primaryAction={
          <Button onClick={handeRefreshListChats} startIcon={<Refresh />}>
            Update list chats
          </Button>
        }
        secondaryAction={
          botName !== "" ? (
            <Link href={`https://t.me/${botName}`}>{`@${botName}`}</Link>
          ) : (
            <></>
          )
        }
        as="h2"
      />

      <ContentLayout>
        {/* 1 */}
        {botName === "" && (
          <EmptyStateLayout
            content="The bot is not configured. Work is not possible!!!"
            icon={<RiErrorWarningFill size={`${80 / 16}rem`} color="red" />}
          />
        )}
        {/* 2 */}
        {botName !== "" && chats.length === 0 && (
          <EmptyListChats handeRefreshListChats={handeRefreshListChats} />
        )}
        {/* 3 */}
        {botName !== "" && chats.length !== 0 && (
          <>
            <ChatsCount count={chats.length} />
            <ListChats chats={chats} deleteChat={deleteChat} />
          </>
        )}
      </ContentLayout>
      {isShowQuestionDelete && (
        <QuestionYesNo
          setShowModal={setIsShowQuestionDelete}
          handleOk={() => handleDelete(chatToProcess)}
          title="Видалення чату"
          question={`Ви дійно бажаєте видалити цей чат?`}
          labelOk="Так"
          labelCancel="Відміна"
        />
      )}
    </Layout>
  );
};

export default HomePage;
