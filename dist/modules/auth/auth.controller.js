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
exports.loginController = exports.registerController = void 0;
// import { User } from 'interfaces/User';
const auth_service_1 = require("./auth.service");
const default_1 = __importDefault(require("src/config/default"));
const user_service_1 = require("../user/user.service");
const accessTokenCookieOptions = {
    expires: new Date(Date.now() + default_1.default.accessTokenExpiresIn * 60 * 1000),
    maxAge: default_1.default.accessTokenExpiresIn * 60 * 1000,
    httpOnly: true,
    sameSite: 'lax',
};
function registerController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('creating a user', req.body);
            const user = yield (0, user_service_1.createUser)({
                email: req.body.email,
                password: req.body.password,
                name: req.body.name,
                teamId: req.body.teamId,
                QrCode: req.body.QRcode,
                NFC: req.body.NFC,
                role: req.body.role,
            });
            res.status(200).json(user);
        }
        catch (error) {
            return res.status(400).json({
                message: 'Error In Register User',
            });
        }
    });
}
exports.registerController = registerController;
function loginController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = (yield (0, user_service_1.findUserByEmail)(req.body.email));
            if (!user)
                throw new Error('Wrong Email');
            if (!(0, user_service_1.comparePassowrds)(req.body.password, user.password))
                throw new Error('Wrong Password');
            const accessToken = (0, auth_service_1.signToken)(user);
            res.cookie('accessToken', accessToken, accessTokenCookieOptions);
            res.status(200).json({
                accessToken,
            });
        }
        catch (error) {
            if (error instanceof Error)
                return res.status(400).json({
                    message: error.message,
                });
            res.status(400).json({
                message: 'Error While Logging In',
            });
        }
    });
}
exports.loginController = loginController;
