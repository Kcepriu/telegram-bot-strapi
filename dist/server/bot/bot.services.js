"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@strapi/utils");
const node_telegram_bot_api_1 = __importDefault(
  require("node-telegram-bot-api")
);
class Bot {
  constructor(strapi, token) {
    this.strapi = strapi;
    this.token = token;
    this.bot = this.token
      ? new node_telegram_bot_api_1.default(this.token, {
          polling: { autoStart: true, params: { timeout: 30 } },
        })
      : null;
    this.connectListeners();
  }
  connectListeners() {
    if (!this.bot) return;
    // Set up bot listeners and commands here
    this.bot.onText(
      /\/start/,
      async (msg) => await this.handleOnText(msg, true)
    );
    this.bot.onText(
      /^(?!\/start).*/,
      async (msg) => await this.handleOnText(msg, false)
    );
    // this.bot.on("polling_error", (error) => {
    //   console.log(error.code); // => 'EFATAL'
    // });
    // Add more listeners and commands as needed
  }
  async handleOnText(msg, isStart = false) {
    if (!this.bot) throw new Error("No connect bot");
    const { text = "" } = msg;
    const { id: chatId, first_name = "", last_name = "" } = msg.chat;
    if (!isStart) {
      this.bot.sendMessage(chatId, "This bot only sends messages.");
      return;
    }
    const message = await this.registerChat({
      chatId: chatId.toString(),
      clientName: `${first_name} ${last_name}`,
      lastMessage: text,
      isSendInformation: false,
    });
    this.bot.sendMessage(chatId, message);
  }
  async registerChat(data) {
    try {
      const { chatId } = data;
      const chats = await strapi
        .plugin("telegram-bot-strapi")
        .service("telegramServices")
        .find({ filters: { chatId } });
      if (chats.length !== 0) return "You are already registered";
      await strapi
        .plugin("telegram-bot-strapi")
        .service("telegramServices")
        .create(data);
    } catch (err) {
      return "Chat registration error";
    }
    return "You are registered";
  }
  async sendMessageToAdmins(message) {
    if (!this.bot) throw new Error("No connect bot");
    const adminChats = await strapi
      .plugin("telegram-bot-strapi")
      .service("telegramServices")
      .find({ filters: { isSendInformation: true } });
    if (adminChats.length === 0) throw "No recipients found";
    const arrayOfPromises = adminChats.map((chat) => {
      return this.bot.sendMessage(chat.chatId, message);
    });
    await Promise.all(arrayOfPromises);
    return { result: "Message send" };
  }
  async sendMessage(chatId, message) {
    if (!this.bot) throw new Error("No connect bot");
    await this.bot.sendMessage(chatId, message);
  }
  async isPolling() {
    if (!this.bot) throw new Error("No connect bot");
    const result = await this.bot.isPolling();
    return { result };
  }
  async getUpdates() {
    if (!this.bot) throw new Error("No connect bot");
    const result = await this.bot.getUpdates();
    return { result };
  }
  async isError() {
    if (!this.bot) throw new Error("No connect bot");
    console.log("is Error");
    return { result: true };
  }
  async getMe() {
    if (!this.bot) throw new Error("No connect bot");
    const result = await this.bot.getMe();
    return result;
  }
}
exports.default = ({ strapi }) => {
  const token = (0, utils_1.env)("TELEGRAM_TOKEN", "") || "";
  const bot = new Bot(strapi, token);
  return bot;
};
