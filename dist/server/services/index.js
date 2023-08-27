"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const my_service_1 = __importDefault(require("./my-service"));
const telegram_services_1 = __importDefault(require("./telegram.services"));
exports.default = {
    myService: my_service_1.default,
    telegramServices: telegram_services_1.default,
};
