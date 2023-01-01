"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = __importDefault(require("./log"));
const moment_1 = __importDefault(require("moment"));
moment_1.default.locale('id');
const makeLog = (0, log_1.default)(moment_1.default);
exports.default = makeLog;
