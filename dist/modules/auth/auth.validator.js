"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerValidator = exports.loginValidator = void 0;
const zod_express_middleware_1 = require("zod-express-middleware");
const zod_1 = require("zod");
exports.loginValidator = (0, zod_express_middleware_1.validateRequest)({
    params: zod_1.z.object({}),
    body: zod_1.z.object({
        email: zod_1.z.string().email({ message: 'Invalid email address' }),
        password: zod_1.z.string(),
    }),
    query: zod_1.z.object({}),
});
exports.registerValidator = (0, zod_express_middleware_1.validateRequest)({
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({ required_error: 'Name is Required' }),
        email: (0, zod_1.string)({ required_error: 'Email is Required' }).email({
            message: 'Email Foramt Is Wrong',
        }),
        password: (0, zod_1.string)({ required_error: 'Password Is Required' }),
        teamId: (0, zod_1.number)({ required_error: 'Team Id is Required' }),
        Qrcode: (0, zod_1.string)({ required_error: 'QR Code is Required' }),
        NFC: (0, zod_1.string)({ required_error: 'NFC code is Required' }),
        role: (0, zod_1.number)({ required_error: 'Role is Reuqired' }).int().gte(0).lte(1),
        passwordConfirm: (0, zod_1.string)({ required_error: 'Please confirm your password' }),
    }).refine((data) => data.password === data.passwordConfirm, {
        path: ['passwordConfirm'],
        message: 'Passwords do not match',
    }),
});
