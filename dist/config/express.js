"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const cloudinary_1 = require("cloudinary");
//middlewares
const errorhandler_1 = require("../middleware/errorhandler");
//routes
const user_1 = __importDefault(require("../routes/user"));
const product_1 = __importDefault(require("../routes/product"));
const order_1 = __importDefault(require("../routes/order"));
dotenv_1.default.config();
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
    api_key: process.env.CLOUDINARY_CLIENT_API,
    api_secret: process.env.CLOUDINARY_CLIENT_SECRETKEY
});
const App = (app) => {
    app.use(express_1.default.json());
    app.use((0, cors_1.default)());
    app.use((0, helmet_1.default)());
    app.use((0, morgan_1.default)("dev"));
    app.use('/uploads', express_1.default.static('uploads'));
    app.use("/api", user_1.default, product_1.default, order_1.default);
    app.use(errorhandler_1.errMiddleware);
    app.use((req, res, next) => {
        next(Error("Endpoint not found"));
    });
    //timeouts for handling slow requests, it will throw an error if a request will take more than 5 seconds.
    app.use((req, res) => {
        req.setTimeout(5000);
        res.setTimeout(5000);
    });
};
exports.App = App;
