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
function makeLogDb({ QueryGet, QueryTransaction }) {
    return Object.freeze({
        getLogDataAll,
        getLogDataDetail,
        createLogDataDetail,
        updateLogDataDetail,
        deleteLogDataDetail
    });
    function getLogDataAll(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        let limit = '';
                        let pagination = '';
                        let where = "WHERE 1=1";
                        let orderby;
                        if (body.moduleId) {
                            where += " AND module_id = '" + body.moduleId + "' ";
                        }
                        if (body.filter) {
                            where += " and " + body.filter;
                        }
                        if (body.perpage) {
                            limit += body.perpage;
                        }
                        else {
                            limit += 1000;
                        }
                        if (body.page) {
                            let offset = parseInt(body.page);
                            let page = offset - 1;
                            pagination = page * limit;
                        }
                        else {
                            pagination = 0;
                        }
                        if (body.orderby == 'username') {
                            orderby = 'ORDER BY username ';
                        }
                        else if (body.orderby == 'menuId') {
                            orderby = 'ORDER BY menu_id ';
                        }
                        else if (body.orderby == 'screenId') {
                            orderby = 'ORDER BY screen_id ';
                        }
                        else if (body.orderby == 'actionType') {
                            orderby = 'ORDER BY action_type ';
                        }
                        else if (body.orderby == 'actionDetail') {
                            orderby = 'ORDER BY action_detail ';
                        }
                        else if (body.orderby == 'actionBeUrl') {
                            orderby = 'ORDER BY action_be_url ';
                        }
                        else if (body.orderby == 'actionBeMethod') {
                            orderby = 'ORDER BY action_be_method ';
                        }
                        else if (body.orderby == 'actionTime') {
                            orderby = 'ORDER BY action_time ';
                        }
                        else if (body.orderby == 'actionStatus') {
                            orderby = 'ORDER BY action_status ';
                        }
                        else {
                            orderby = 'ORDER BY id ';
                        }
                        if (body.ordertype == 'asc' || body.ordertype == 'desc') {
                            orderby += body.ordertype;
                        }
                        else {
                            orderby += 'asc';
                        }
                        let sql = `SELECT id, username, module_id, menu_id, screen_id, action_type, action_detail, action_be_url, action_be_method, 
                  action_time, CASE WHEN action_status = 1 THEN 'success' ELSE 'failed' END as 'action_status'
                  FROM t_user_activity ${where} ${orderby} OFFSET ${parseInt(pagination)} ROWS FETCH NEXT ${parseInt(limit)} ROWS ONLY`;
                        let sqlCount = `SELECT count(id) as 'count' FROM t_user_activity ${where}`;
                        let sqlFilter = `SELECT field_order as 'fieldOrder', field_name as 'fieldName', field_desc as 'fieldDesc', field_type as 'fieldType'  
                        FROM M_Menu_Filter WHERE menu_id = ''`;
                        let result = yield QueryGet(sql);
                        let resultCount = yield QueryGet(sqlCount);
                        let resultFilter = yield QueryGet(sqlFilter);
                        if (result.status == true && resultCount.status == true && resultFilter.status == true) {
                            if (result.data.recordset.length > 0) {
                                resolve({ status: true, responseCode: 200, data: result.data.recordset, filter: resultFilter.data.recordset, countAll: resultCount.data.recordset[0].count });
                            }
                            else {
                                resolve({ status: true, responseCode: 200, data: [], filter: resultFilter.data.recordset, countAll: resultCount.data.recordset[0].count });
                            }
                        }
                        else {
                            if (result.status == false) {
                                resolve({ status: false, responseCode: 500, data: 'SQL ' + result.data.number });
                            }
                            else if (resultCount.status == false) {
                                resolve({ status: false, responseCode: 500, data: 'SQL ' + resultCount.data.number });
                            }
                            else {
                                resolve({ status: false, responseCode: 500, data: 'SQL ' + resultFilter.data.number });
                            }
                        }
                    }
                    catch (error) {
                        reject(new Error('logDb-getLogDataAll ' + error));
                    }
                });
            });
        });
    }
    function getLogDataDetail(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        let sql = `SELECT id, username, module_id, menu_id, screen_id, action_type, action_detail, action_be_url, action_be_method, action_time,
                      CASE WHEN action_status = 1 THEN 'success' ELSE 'failed' END as 'action_status' FROM t_user_activity WHERE id = '${body.id}'`;
                        let result = yield QueryGet(sql);
                        if (result.status == true) {
                            if (result.data.recordset.length > 0) {
                                resolve({ status: true, responseCode: 200, data: result.data.recordset[0] });
                            }
                            else {
                                resolve({ status: false, responseCode: 404, data: {} });
                            }
                        }
                        else {
                            resolve({ status: false, responseCode: 500, data: 'SQL ' + result.data.number });
                        }
                    }
                    catch (error) {
                        reject(new Error('logDb-getLogDataDetail ' + error));
                    }
                });
            });
        });
    }
    function createLogDataDetail(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        let sql = `INSERT INTO t_user_activity (username, module_id, menu_id, screen_id, action_type, action_detail, action_be_url, action_be_method, action_time, action_status) 
                      OUTPUT inserted.id
                      VALUES ('${body.getUsername()}', '${body.getModuleId()}', '${body.getMenuId()}', '${body.getScreenId()}', '${body.getActionType()}', '${body.getActionDetail()}', 
                              '${body.getActionBeUrl()}', '${body.getActionBeMethod()}', '${body.getActionTime()}', '${body.getActionStatus()}')`;
                        let result = yield QueryTransaction(sql);
                        if (result.status == true) {
                            if (result.data.rowsAffected > 0) {
                                resolve({ status: true, responseCode: 200, data: 'log add successfully', id: result.data.recordset[0].id });
                            }
                            else {
                                resolve({ status: false, responseCode: 400, data: 'Wrong Configuration' });
                            }
                        }
                        else {
                            resolve({ status: false, responseCode: 500, data: 'SQL ' + result.data.number });
                        }
                    }
                    catch (err) {
                        reject(new Error('logDb-createLogDataDetail ' + err));
                    }
                });
            });
        });
    }
    function updateLogDataDetail(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        let sql = `UPDATE t_user_activity SET
                      action_time = '${body.getActionTime()}', 
                      action_status = '${body.getActionStatus()}'
                      WHERE id = '${body.getId()}'`;
                        let result = yield QueryTransaction(sql);
                        if (result.status == true) {
                            if (result.data.rowsAffected > 0) {
                                resolve({ status: true, responseCode: 200, data: 'log update successfully' });
                            }
                            else {
                                resolve({ status: false, responseCode: 400, data: 'Wrong Configuration' });
                            }
                        }
                        else {
                            resolve({ status: false, responseCode: 500, data: 'SQL ' + result.data.number });
                        }
                    }
                    catch (error) {
                        reject(new Error('logDb-updateLogDataDetail ' + error));
                    }
                });
            });
        });
    }
    function deleteLogDataDetail(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        const id = body.id.toString().replace(/,/gi, "','");
                        const sql = `DELETE FROM t_user_activity WHERE id in ('${id}')`;
                        let result = yield QueryTransaction(sql);
                        if (result.status == true) {
                            const total = body.rowId.length;
                            if (result.data.rowsAffected > 0) {
                                resolve({ status: true, responseCode: 200, data: total + ' Log deleted successfully' });
                            }
                            else {
                                resolve({ status: false, responseCode: 400, data: 'Wrong Configuration' });
                            }
                        }
                        else {
                            resolve({ status: false, responseCode: 500, data: 'SQL ' + result.data.number });
                        }
                    }
                    catch (error) {
                        reject(new Error('logDb-deleteLogDataDetail' + error));
                    }
                });
            });
        });
    }
}
exports.default = makeLogDb;
