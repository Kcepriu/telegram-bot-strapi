"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const bot_services_1 = __importDefault(require("./bot/bot.services"));
exports.default = async ({ strapi }) => {
  strapi.plugin("telegram-bot-strapi").telegramBot = (0,
  bot_services_1.default)({ strapi });
};
