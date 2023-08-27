"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const my_controller_1 = __importDefault(require("./my-controller"));
const telegram_controller_1 = __importDefault(require("./telegram.controller"));
const bot_controller_1 = __importDefault(require("./bot.controller"));
exports.default = {
    myController: my_controller_1.default,
    telegramController: telegram_controller_1.default,
    botController: bot_controller_1.default,
};
