"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const config_1 = require("./config");
const routes_1 = require("./routes");
const helpers_1 = require("./helpers");
const errors_1 = require("./errors");
const sessions_1 = require("./sessions");
const port = (0, config_1.getConfig)("http:port", 5000);
const expressApp = (0, express_1.default)();
expressApp.use((0, helmet_1.default)());
expressApp.use(express_1.default.json());
expressApp.use(express_1.default.urlencoded({ extended: true }));
expressApp.use(express_1.default.static("node_modules/bootstrap/dist"));
expressApp.use(express_1.default.static("node_modules/bootstrap-icons"));
(0, helpers_1.createTemplates)(expressApp);
(0, sessions_1.createSessions)(expressApp);
(0, routes_1.createRoutes)(expressApp);
(0, errors_1.createErrorHandlers)(expressApp);
const server = (0, http_1.createServer)(expressApp);
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
