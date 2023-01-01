"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function buildMakeLog(moment) {
    return function makeLog({ id = '', username = '', moduleId = '', menuId = '', screenId = '', actionType = '', actionDetail = '', actionBeUrl = '', actionBeMethod = '', actionTime = moment().format('YYYY-MM-DD HH:mm:ss'), actionStatus = '' } = {}) {
        let status;
        if (actionStatus == 'success') {
            status = 1;
        }
        else {
            status = 0;
        }
        return Object.freeze({
            getId: () => id,
            getUsername: () => username,
            getModuleId: () => moduleId,
            getMenuId: () => menuId,
            getScreenId: () => screenId,
            getActionType: () => actionType,
            getActionDetail: () => actionDetail,
            getActionBeUrl: () => actionBeUrl,
            getActionBeMethod: () => actionBeMethod,
            getActionTime: () => actionTime,
            getActionStatus: () => status
        });
    };
}
exports.default = buildMakeLog;
