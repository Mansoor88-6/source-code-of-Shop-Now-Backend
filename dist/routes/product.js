"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productController = __importStar(require("../controller/product/product"));
const multer_1 = require("../config/multer");
const multer_2 = __importDefault(require("multer"));
const route = express_1.default.Router();
route.post("/product", (req, res, next) => {
    multer_1.upload.single("image")(req, res, (err) => {
        if (err instanceof multer_2.default.MulterError) {
            next(err);
        }
        else if (err) {
            next(err);
        }
        // Everything went fine.
        next();
    });
}, productController.saveProduct);
route.get("/product", productController.getAllProducts);
route.get("/product/:id", productController.getProduct);
route.put("/product/:id", productController.updateProductFully);
route.delete("/product/:id", productController.delProduct);
exports.default = route;
