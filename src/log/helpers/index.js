"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisClient = exports.handleError = exports.ErrorHandler = void 0;
const error_1 = require("./error");
Object.defineProperty(exports, "ErrorHandler", { enumerable: true, get: function () { return error_1.ErrorHandler; } });
Object.defineProperty(exports, "handleError", { enumerable: true, get: function () { return error_1.handleError; } });
const redis_1 = __importDefault(require("./redis"));
exports.redisClient = redis_1.default;
const helperServices = Object.freeze({
    ErrorHandler: error_1.ErrorHandler,
    handleError: error_1.handleError,
    redisClient: redis_1.default
});
exports.default = helperServices;
