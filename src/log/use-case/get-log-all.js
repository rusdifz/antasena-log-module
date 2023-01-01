"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
function makeGetLogAll({ logDb, moment }) {
    return function getLogAll(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield logDb.getLogDataAll(body);
                let result;
                if (data.status == true) {
                    let logData;
                    if (data.data.length > 0) {
                        logData = yield Promise.all(data.data.map(log => {
                            let actionTime;
                            if (log.action_time == null) {
                                actionTime = null;
                            }
                            else {
                                actionTime = moment(log.action_time).format('YYYY-MM-DD HH:mm:ss');
                            }
                            const logAll = {
                                id: log.id,
                                username: log.username,
                                moduleId: log.module_id,
                                menuId: log.menu_id,
                                screenId: log.screen_id,
                                actionType: log.action_type,
                                actionDetail: log.action_detail,
                                actionBeUrl: log.action_be_url,
                                actionBeMethod: log.action_be_method,
                                actionTime: actionTime,
                                actionStatus: log.action_status
                            };
                            return logAll;
                        }));
                    }
                    else {
                        logData = [];
                    }
                    result = {
                        status: true,
                        responseCode: 200,
                        data: logData
                    };
                }
                else {
                    result = {
                        status: false,
                        responseCode: data.responseCode,
                        data: data.data
                    };
                }
                return result;
            }
            catch (error) {
                throw new Error('usecase-getLogAll ' + error);
            }
        });
    };
}
exports.default = makeGetLogAll;
