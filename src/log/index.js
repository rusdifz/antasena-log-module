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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const camelcase_keys_1 = __importDefault(require("camelcase-keys"));
const helpers_1 = require("./helpers");
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const makeCallback = require('./call-back');
const controller_1 = require("./controller");
app.use(body_parser_1.default.json({ limit: '100000kb' }));
app.use((0, cors_1.default)());
//endpoint internal
app.put('/activity/detail', makeCallback(controller_1.createLogDetail, camelcase_keys_1.default));
// app.post('/activity/detail', makeCallback(updateLogDetail,camelcaseKeys))
app.delete('/activity/detail', makeCallback(controller_1.deleteLogDetail, camelcase_keys_1.default));
app.get('/activity/detail', makeCallback(controller_1.getLogDetail, camelcase_keys_1.default));
app.get('/activity/all', makeCallback(controller_1.getLogAll, camelcase_keys_1.default));
function subsRedis() {
    return __awaiter(this, void 0, void 0, function* () {
        //Creates a consumer group to receive payload
        const consumerGroup = yield helpers_1.redisClient.joinConsumerGroup("MyGroup", '0');
        console.log(`Created group with name: ${consumerGroup.name}`);
        //Registers a new consumer with Name and Callback for message handlling.
        const subscriptionHandle = yield consumerGroup.subscribe("Consumer1", newMessageHandler);
        console.log(`Created consumer in group and subscribed with handle id: ${subscriptionHandle}`);
        // Handler for arriving Payload
        function newMessageHandler(payload) {
            return __awaiter(this, void 0, void 0, function* () {
                for (let index = 0; index < payload.length; index++) {
                    try {
                        const element = payload[index];
                        if (element.channel == 'saveLog') {
                            console.log("\n");
                            console.log("Payload Id:", element.id); //Payload Id
                            // console.log("Actual Payload:", element.payload); //Actual Payload
                            const ack = yield element.markAsRead(); //Payload is marked as delivered or Acked also optionaly the message can be dropped.
                            console.log("Payload acked : " + ack);
                            (0, controller_1.createLogDetail)(element.payload)
                                .then(httpResponse => {
                                console.log('response', httpResponse);
                            })
                                .catch(e => {
                                console.log('error', e);
                            });
                        }
                    }
                    catch (exception) {
                        console.error(exception);
                    }
                }
            });
        }
    });
}
setTimeout(subsRedis, 3000, 's');
// subsRedis()
//endpoint check server
app.get('/server_check', function (req, res) {
    res.send({
        statusCode: 200,
        body: {
            responseCode: 200,
            data: 'log service good'
        }
    });
});
app.use((err, req, res, next) => {
    (0, helpers_1.handleError)(err, res);
});
exports.default = app;
