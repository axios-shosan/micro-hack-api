"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const zod_1 = require("zod");
exports.userSchema = (0, zod_1.object)({
    id: (0, zod_1.number)({ required_error: 'Id is Required' }),
    name: (0, zod_1.string)({ required_error: 'Name is Required' }),
    email: (0, zod_1.string)({ required_error: 'Email is Required' }).email({
        message: 'Email Foramt Is Wrong',
    }),
    password: (0, zod_1.string)({ required_error: 'Password Is Required' }),
    teamId: (0, zod_1.number)({ required_error: 'Team Id is Required' }),
    Qrcode: (0, zod_1.string)({ required_error: 'QR Code is Required' }),
    NFC: (0, zod_1.string)({ required_error: 'NFC code is Required' }),
    role: (0, zod_1.number)({ required_error: 'Role is Reuqired' }).int().gte(0).lte(1),
    createdAt: (0, zod_1.date)({ required_error: 'Created At is Requried' }),
    updatedAt: (0, zod_1.date)({ required_error: 'Updated At is Requried' }),
});
// export type CreateUserInput = TypeOf<typeof createuserschema="">['body'];
// export type LoginUserInput = TypeOf<typeof loginuserschema="">['body'];
