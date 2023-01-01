"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const log_1 = __importDefault(require("./log"));
const app = (0, express_1.default)();
const port = process.env.PORT_APP;
app.use('/log', log_1.default);
app.listen(port, () => console.log(`Server is listening on port ${port}`));
// rm -rf src/ && tsc -p .
