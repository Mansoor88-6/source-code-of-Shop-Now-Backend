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
exports.delOrder = exports.updateOrderFully = exports.getOrder = exports.saveOrder = void 0;
const order_1 = __importDefault(require("../../model/order"));
const saveOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, productId, quantity, totalAmount, orderDate } = req.body;
        const product = yield order_1.default.create({
            userId,
            productId,
            quantity,
            totalAmount,
            orderDate
        });
        res.status(201).json(product);
    }
    catch (error) {
        next(error);
    }
});
exports.saveOrder = saveOrder;
const getOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const order = yield order_1.default.findById(id);
        if (!order) {
            return res.status(404).json("Order not found");
        }
        res.json(order);
    }
    catch (error) {
        next(error);
    }
});
exports.getOrder = getOrder;
const updateOrderFully = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { userId, productId, quantity, totalAmount, orderDate } = req.body;
        const order = yield order_1.default.findByIdAndUpdate(id, {
            userId,
            productId,
            quantity,
            totalAmount,
            orderDate
        }, { new: true });
        res.status(201).json(order);
    }
    catch (error) {
        next(error);
    }
});
exports.updateOrderFully = updateOrderFully;
const delOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const user = yield order_1.default.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json("User not found");
        }
        res.status(200).json({ message: `Order with id ${id} is successfully deleted` });
    }
    catch (error) {
        next(error);
    }
});
exports.delOrder = delOrder;
