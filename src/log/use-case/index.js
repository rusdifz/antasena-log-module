"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDataLogAll = exports.getDataLogDetail = exports.deleteDataLogDetail = exports.updateDataLogDetail = exports.createDataLogDetail = void 0;
const moment_1 = __importDefault(require("moment"));
moment_1.default.locale('id');
const data_access_1 = require("../data-access");
const log_1 = __importDefault(require("../entity/log"));
const create_log_detail_1 = __importDefault(require("./create-log-detail"));
const update_log_detail_1 = __importDefault(require("./update-log-detail"));
const delete_log_detail_1 = __importDefault(require("./delete-log-detail"));
const get_log_detail_1 = __importDefault(require("./get-log-detail"));
const get_log_all_1 = __importDefault(require("./get-log-all"));
const createDataLogDetail = (0, create_log_detail_1.default)({ logDb: data_access_1.logDb, makeLog: log_1.default });
exports.createDataLogDetail = createDataLogDetail;
const updateDataLogDetail = (0, update_log_detail_1.default)({ logDb: data_access_1.logDb, makeLog: log_1.default });
exports.updateDataLogDetail = updateDataLogDetail;
const deleteDataLogDetail = (0, delete_log_detail_1.default)({ logDb: data_access_1.logDb });
exports.deleteDataLogDetail = deleteDataLogDetail;
const getDataLogDetail = (0, get_log_detail_1.default)({ logDb: data_access_1.logDb, moment: moment_1.default });
exports.getDataLogDetail = getDataLogDetail;
const getDataLogAll = (0, get_log_all_1.default)({ logDb: data_access_1.logDb, moment: moment_1.default });
exports.getDataLogAll = getDataLogAll;
const logModuleService = Object.freeze({
    createDataLogDetail,
    updateDataLogDetail,
    deleteDataLogDetail,
    getDataLogDetail,
    getDataLogAll
});
exports.default = logModuleService;
