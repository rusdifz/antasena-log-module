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
function makeGetLogDetail({ logDb, moment }) {
    return function getLogDetail(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield logDb.getLogDataDetail(body);
                let result;
                if (data.status == true) {
                    let logData;
                    if (data.responseCode == 200) {
                        let actionTime;
                        if (data.data.action_time == null) {
                            actionTime = null;
                        }
                        else {
                            actionTime = moment(data.data.action_time).format('YYYY-MM-DD HH:mm:ss');
                        }
                        logData = {
                            id: data.data.id,
                            username: data.data.username,
                            moduleId: data.data.module_id,
                            menuId: data.data.menu_id,
                            screenId: data.data.screen_id,
                            actionType: data.data.action_type,
                            actionDetail: data.data.action_detail,
                            actionBeUrl: data.data.action_be_url,
                            actionBeMethod: data.data.action_be_method,
                            actionTime: actionTime,
                            actionStatus: data.data.action_status
                        };
                    }
                    else {
                        logData = {};
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
                throw new Error('usecase-getLogDetail ' + error);
            }
        });
    };
}
exports.default = makeGetLogDetail;
