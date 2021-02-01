"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = __importDefault(require("./api/api"));
const messageHandler_1 = __importDefault(require("./utils/messageHandler"));
const express_1 = __importDefault(require("express"));
const cors = require('cors');
const app = express_1.default();
const port = process.env.PORT || 9000;
const yesterday = (d => new Date(d.setDate(d.getDate() - 1)))(new Date);
const URL = 'blocks?format=json';
const ALT_URL = `blocks/${yesterday.getTime()}?format=json`;
const HASH_URL = '/rawblock';
app.listen(port, () => {
    console.log(`Starting server at  ${port}`);
});
app.use(express_1.default.static('public'));
app.use(express_1.default.json({ limit: '1mb' }));
app.use(cors());
app.options('*', cors());
app.get('/blocks', async (request, response) => {
    try {
        const blocks_response = await api_1.default.get(URL);
        messageHandler_1.default(blocks_response);
        response.json(blocks_response.data);
    }
    catch (error) {
        messageHandler_1.default(error);
        console.log('Error to get the data from main url. Trying the alternative one...');
        try {
            const blocks_response = await api_1.default.get(ALT_URL);
            messageHandler_1.default(blocks_response);
            response.json(blocks_response.data);
        }
        catch (error) {
            messageHandler_1.default(error);
        }
    }
});
app.get('/blocks/:hash', async (request, response) => {
    try {
        console.log(`Hash parameter: ${JSON.stringify(request.params)}`);
        const blockDetailResponse = await api_1.default.get(`${HASH_URL}/${request.params.hash}`);
        messageHandler_1.default(blockDetailResponse);
        response.json(blockDetailResponse.data);
    }
    catch (error) {
        messageHandler_1.default(error);
    }
});
