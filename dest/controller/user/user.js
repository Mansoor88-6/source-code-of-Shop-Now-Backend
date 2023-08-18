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
exports.delUser = exports.updateUserFully = exports.getUser = exports.saveUser = void 0;
const user_1 = __importDefault(require("../../model/user"));
const saveUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, shippingAddress } = req.body;
        if (shippingAddress) {
            const user = yield user_1.default.create({
                name,
                email,
                password,
                shippingAddress
            });
            res.status(201).json(user);
        }
        else {
            const user = yield user_1.default.create({
                name,
                email,
                password,
            });
            res.status(201).json(user);
        }
    }
    catch (error) {
        next(error);
    }
});
exports.saveUser = saveUser;
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const user = yield user_1.default.findById(id);
        if (!user) {
            return res.status(404).json("User not found");
        }
        res.json(user);
    }
    catch (error) {
        next(error);
    }
});
exports.getUser = getUser;
const updateUserFully = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { name, email, password, shippingAddress } = req.body;
        if (shippingAddress) {
            const user = yield user_1.default.findByIdAndUpdate(id, {
                name,
                email,
                password,
                shippingAddress
            }, { new: true });
            res.status(201).json(user);
        }
        else {
            const user = yield user_1.default.findByIdAndUpdate(id, {
                name,
                email,
                password,
            }, { new: true });
            res.status(201).json(user);
        }
    }
    catch (error) {
        next(error);
    }
});
exports.updateUserFully = updateUserFully;
const delUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const user = yield user_1.default.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json("User not found");
        }
        res.status(200).json({ message: `User with id ${id} is successfully deleted` });
    }
    catch (error) {
        next(error);
    }
});
exports.delUser = delUser;
