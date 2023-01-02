"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Config = {
    port: process.env.PORT,
    accessTokenExpiresIn: 15,
    bcryptSalt: 10,
    origin: 'http://localhost:3000',
};
exports.default = Config;
