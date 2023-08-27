"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ strapi }) => ({
  async sendMessageToAdmins(ctx) {
    try {
      ctx.body = await strapi
        .plugin("telegram-bot-strapi")
        .telegramBot.sendMessageToAdmins(ctx.request.body.message);
    } catch (err) {
      ctx.throw(500, err.message);
    }
  },
  async isPolling(ctx) {
    try {
      ctx.body = await strapi
        .plugin("telegram-bot-strapi")
        .telegramBot.isPolling();
    } catch (err) {
      ctx.throw(500, err.message);
    }
  },
  async getUpdates(ctx) {
    try {
      ctx.body = await strapi
        .plugin("telegram-bot-strapi")
        .telegramBot.getUpdates();
    } catch (err) {
      ctx.throw(500, err.message);
    }
  },
  async getMe(ctx) {
    try {
      ctx.body = await strapi.plugin("telegram-bot-strapi").telegramBot.getMe();
    } catch (err) {
      ctx.throw(500, err.message);
    }
  },
});
