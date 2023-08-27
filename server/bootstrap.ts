import { Strapi } from "@strapi/strapi";
import botServices from "./bot/bot.services";

export default async ({ strapi }: { strapi: Strapi }) => {
  strapi.plugin("telegram-bot-strapi").telegramBot = botServices({ strapi });
};
