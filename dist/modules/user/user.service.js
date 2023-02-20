'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.findAllUsers =
  exports.findUserById =
  exports.findUserByEmail =
  exports.createUser =
  exports.comparePassowrds =
  exports.hashPassword =
    void 0;
const prisma_1 = __importDefault(require('src/infra/prisma'));
const bcrypt_1 = __importDefault(require('bcrypt'));
const default_1 = __importDefault(require('src/config/default'));
// import { signJwt } from 'src/modules/auth/auth.service';
// import cofing from "config/default"
function hashPassword(password) {
  return bcrypt_1.default.hashSync(password, default_1.default.bcryptSalt);
}
exports.hashPassword = hashPassword;
function comparePassowrds(inputPassword, originalPassword) {
  return bcrypt_1.default.compareSync(inputPassword, originalPassword);
}
exports.comparePassowrds = comparePassowrds;
// CreateUser service
const createUser = (userInput) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const user = Object.assign(Object.assign({}, userInput), {
      password: hashPassword(userInput.password),
    });
    return prisma_1.default.user.create({ data: user });
  });
exports.createUser = createUser;
//Find User By Email
function findUserByEmail(email) {
  return __awaiter(this, void 0, void 0, function* () {
    return prisma_1.default.user.findUnique({ where: { email } });
  });
}
exports.findUserByEmail = findUserByEmail;
// Find User by Id
function findUserById(id) {
  return __awaiter(this, void 0, void 0, function* () {
    return prisma_1.default.user.findUnique({ where: { id } });
  });
}
exports.findUserById = findUserById;
// Find All users
const findAllUsers = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.user.findMany();
  });
exports.findAllUsers = findAllUsers;
// Sign Token
