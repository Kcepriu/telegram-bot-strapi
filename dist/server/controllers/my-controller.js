"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin("telegram-bot-strapi")
      .service("myService")
      .getWelcomeMessage();
  },
});
