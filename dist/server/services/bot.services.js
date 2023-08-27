"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@strapi/utils");
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
class Bot {
    constructor(strapi, token) {
        this.strapi = strapi;
        this.token = token;
        this.bot = this.token
            ? new node_telegram_bot_api_1.default(this.token, { polling: true })
            : null;
        this.connectListeners();
    }
    connectListeners() {
        if (!this.bot)
            return;
        // Set up bot listeners and commands here
        this.bot.onText(/\/start/, async (msg) => await this.handleOnText(msg, true));
        this.bot.onText(/^(?!\/start).*/, async (msg) => await this.handleOnText(msg, false));
        // Add more listeners and commands as needed
    }
    async handleOnText(msg, isStart = false) {
        if (!this.bot)
            throw "No connect bot";
        const { text = "" } = msg;
        const { id: chatId, first_name = "", last_name = "" } = msg.chat;
        const message = isStart
            ? "You are registered"
            : "This bot only sends messages.";
        if (isStart)
            await this.registerChat({
                chatId: chatId.toString(),
                clientName: `${first_name} ${last_name}`,
                lastMessage: "",
                isSendInformation: false,
            });
        this.bot.sendMessage(chatId, message);
    }
    async registerChat(data) {
        try {
            const result = await strapi
                .plugin("telegram-bot")
                .service("telegramServices")
                .create(data);
            console.log("result", result);
        }
        catch (err) {
            console.log(err);
            return false;
        }
        return true;
    }
    async sendMessageToAdmins(message) {
        if (!this.bot)
            throw "No connect bot";
        const res = await this.bot.sendMessage(488752587, message);
        return { result: "Message send" };
    }
}
console.log("2222222222222222222222");
exports.default = ({ strapi }) => {
    const token = (0, utils_1.env)("TELEGRAM_TOKEN", "") || "";
    const bot = new Bot(strapi, token);
    return bot;
};
