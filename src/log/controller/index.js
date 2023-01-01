"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLogAll = exports.getLogDetail = exports.deleteLogDetail = exports.updateLogDetail = exports.createLogDetail = void 0;
const use_case_1 = require("../use-case");
const create_log_detail_1 = __importDefault(require("./create-log-detail"));
const update_log_detail_1 = __importDefault(require("./update-log-detail"));
const delete_log_detail_1 = __importDefault(require("./delete-log-detail"));
const get_log_detail_1 = __importDefault(require("./get-log-detail"));
const get_log_all_1 = __importDefault(require("./get-log-all"));
const createLogDetail = (0, create_log_detail_1.default)({ createDataLogDetail: use_case_1.createDataLogDetail });
exports.createLogDetail = createLogDetail;
const updateLogDetail = (0, update_log_detail_1.default)({ updateDataLogDetail: use_case_1.updateDataLogDetail });
exports.updateLogDetail = updateLogDetail;
const deleteLogDetail = (0, delete_log_detail_1.default)({ deleteDataLogDetail: use_case_1.deleteDataLogDetail });
exports.deleteLogDetail = deleteLogDetail;
const getLogDetail = (0, get_log_detail_1.default)({ getDataLogDetail: use_case_1.getDataLogDetail });
exports.getLogDetail = getLogDetail;
const getLogAll = (0, get_log_all_1.default)({ getDataLogAll: use_case_1.getDataLogAll });
exports.getLogAll = getLogAll;
const logController = Object.freeze({
    createLogDetail,
    updateLogDetail,
    deleteLogDetail,
    getLogDetail,
    getLogAll
});
exports.default = logController;
