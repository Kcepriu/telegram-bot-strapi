import { Strapi } from "@strapi/strapi";

export default ({ strapi }: { strapi: Strapi }) => ({
  async find(ctx) {
    try {
      return await strapi
        .plugin("telegram-bot-strapi")
        .service("telegramServices")
        .find(ctx.query);
    } catch (err) {
      ctx.throw(500, err.message);
    }
  },

  async findByChatId(ctx) {
    const { chatId } = ctx.params;
    ctx.query.filters = { chatId };

    try {
      return await strapi
        .plugin("telegram-bot-strapi")
        .service("telegramServices")
        .find(ctx.query);
    } catch (err) {
      ctx.throw(500, err.message);
    }
  },

  async create(ctx) {
    try {
      ctx.body = await strapi
        .plugin("telegram-bot-strapi")
        .service("telegramServices")
        .create(ctx.request.body);
    } catch (err) {
      ctx.throw(500, err.message);
    }
  },

  async delete(ctx) {
    try {
      ctx.body = await strapi
        .plugin("telegram-bot-strapi")
        .service("telegramServices")
        .delete(ctx.params.id);
    } catch (err) {
      ctx.throw(500, err.message);
    }
  },

  async update(ctx) {
    try {
      ctx.body = await strapi
        .plugin("telegram-bot-strapi")
        .service("telegramServices")
        .update(ctx.params.id, ctx.request.body);
    } catch (err) {
      ctx.throw(500, err.message);
    }
  },
});
