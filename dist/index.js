"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv"); // import env variables
(0, dotenv_1.config)();
const auth_route_1 = __importDefault(require("./modules/auth/auth.route"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('hello');
});
app.use('/auth', auth_route_1.default);
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
