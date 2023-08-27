"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ strapi }) => ({
  async find(query) {
    return await strapi.entityService.findMany(
      "plugin::telegram-bot-strapi.telegram",
      query
    );
  },
  async delete(id) {
    return await strapi.entityService.delete(
      "plugin::telegram-bot-strapi.telegram",
      id
    );
  },
  async create(data) {
    return await strapi.entityService.create(
      "plugin::telegram-bot-strapi.telegram",
      {
        data,
      }
    );
  },
  async update(id, data) {
    const result = await strapi.entityService.update(
      "plugin::telegram-bot-strapi.telegram",
      id,
      { data }
    );
    return result;
  },
});
