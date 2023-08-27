"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = [
    {
        method: "GET",
        path: "/find",
        handler: "telegramController.find",
        config: {
            policies: [],
            // auth: false,
        },
    },
    {
        method: "GET",
        path: "/find/:chatId",
        handler: "telegramController.findByChatId",
        config: {
            policies: [],
            // auth: false,
        },
    },
    {
        method: "POST",
        path: "/create",
        handler: "telegramController.create",
        config: {
            policies: [],
            // auth: false,
        },
    },
    {
        method: "DELETE",
        path: "/delete/:id",
        handler: "telegramController.delete",
        config: {
            policies: [],
            // auth: false,
        },
    },
    {
        method: "PUT",
        path: "/update/:id",
        handler: "telegramController.update",
        config: {
            policies: [],
            // auth: false,
        },
    },
    {
        method: "POST",
        path: "/send-message",
        handler: "botController.sendMessageToAdmins",
        config: {
            policies: [],
            auth: false,
        },
    },
    {
        method: "GET",
        path: "/me",
        handler: "botController.getMe",
        config: {
            policies: [],
            auth: false,
        },
    },
    {
        method: "GET",
        path: "/is-polling",
        handler: "botController.isPolling",
        config: {
            policies: [],
            // auth: false,
        },
    },
    // {
    //   method: "GET",
    //   path: "/get-updates",
    //   handler: "botController.getUpdates",
    //   config: {
    //     policies: [],
    //     auth: false,
    //   },
    // },
];
