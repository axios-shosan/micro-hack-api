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
exports.signToken = exports.verifyJwt = exports.signJwt = void 0;
const default_1 = __importDefault(require("src/config/default"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signJwt = (payload, options = {}) => {
    const privateKey = Buffer.from(process.env.ACCESS_TOKEN_PRIVATE_KEY, 'base64').toString('ascii');
    return jsonwebtoken_1.default.sign(payload, privateKey, Object.assign(Object.assign({}, (options && options)), { algorithm: 'RS256' }));
};
exports.signJwt = signJwt;
const verifyJwt = (token) => {
    try {
        const publicKey = Buffer.from(process.env.ACCESS_TOKEN_PUBLIC_KEY, 'base64').toString('ascii');
        return jsonwebtoken_1.default.verify(token, publicKey);
    }
    catch (error) {
        return null;
    }
};
exports.verifyJwt = verifyJwt;
const signToken = (user) => __awaiter(void 0, void 0, void 0, function* () {
    // Sign the access token
    const accessToken = (0, exports.signJwt)({
        id: user.id,
        email: user.email,
        name: user.name,
        teamId: user.teamId,
        QRcode: user.QRcode,
        NFC: user.NFC,
        role: user.role,
    }, {
        expiresIn: `${default_1.default.accessTokenExpiresIn}m`,
    });
    //   // Create a Session
    //   redisClient.set(user._id, JSON.stringify(user), {
    //     EX: 60 * 60,
    //   });
    // Return access token
    return { accessToken };
});
exports.signToken = signToken;
