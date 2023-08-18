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
exports.delProduct = exports.updateProductFully = exports.getAllProducts = exports.getProduct = exports.saveProduct = void 0;
const product_1 = __importDefault(require("../../model/product"));
const cloudinary_1 = __importDefault(require("cloudinary"));
const saveProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.file) {
            const myCloud = yield cloudinary_1.default.v2.uploader.upload(req.file.path);
            const { name, description, price, category } = req.body;
            const product = yield product_1.default.create({
                name,
                description,
                price,
                category,
                image: {
                    public_id: `${myCloud.public_id}`,
                    image_url: `${myCloud.secure_url}`
                }
            });
            res.status(201).json(product);
        }
        else {
            res.status(400).json({ error: "No file uploaded" });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.saveProduct = saveProduct;
const getProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const product = yield product_1.default.findById(id);
        if (!product) {
            return res.status(404).json("Product not found");
        }
        res.json(product);
    }
    catch (error) {
        next(error);
    }
});
exports.getProduct = getProduct;
const getAllProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { category, limit } = req.query;
        const pipeline = [];
        // Filter by category if provided
        if (category) {
            pipeline.push({
                $match: {
                    category: category
                }
            });
        }
        // Limit the number of products if provided
        if (limit) {
            pipeline.push({
                $limit: parseInt(String(limit))
            });
        }
        // Execute the aggregation pipeline if there are any pipeline stages
        if (pipeline.length > 0) {
            const products = yield product_1.default.aggregate(pipeline);
            if (!products || products.length === 0) {
                return res.status(404).json("Products not found");
            }
            return res.json(products);
        }
        // Send all products if no query parameters are provided
        const products = yield product_1.default.find({});
        if (!products || products.length === 0) {
            return res.status(404).json("Products not found");
        }
        res.json(products);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllProducts = getAllProducts;
const updateProductFully = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { name, description, price, imageUrl, category } = req.body;
        const product = yield product_1.default.findByIdAndUpdate(id, {
            name,
            description,
            price,
            imageUrl,
            category
        }, { new: true });
        res.status(201).json(product);
    }
    catch (error) {
        next(error);
    }
});
exports.updateProductFully = updateProductFully;
const delProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const user = yield product_1.default.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json("User not found");
        }
        res.status(200).json({ message: `Product with id ${id} is successfully deleted` });
    }
    catch (error) {
        next(error);
    }
});
exports.delProduct = delProduct;
