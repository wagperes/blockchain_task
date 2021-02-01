"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const messageHandler = (message) => {
    const { config, data, status } = message || {};
    const todayDateTime = new Date();
    if (config) {
        console.log(`Used URL: ${config.url}`);
    }
    switch (status) {
        case 200:
            console.log(`${todayDateTime} - Success`);
            if (data) {
                // console.log(JSON.stringify(data, null, 2));
            }
            break;
        case 400:
            console.warn(data || 'Bad request sent to server.');
            break;
        case 404:
            console.warn(data || 'Not found: The server cannot find the requested data.');
            break;
        case 503:
            console.error(data || 'Service Unavailable: probably the server is overloaded or down.');
            break;
        default:
            console.error(data || 'Another error has occurred.');
            break;
    }
};
exports.default = messageHandler;
