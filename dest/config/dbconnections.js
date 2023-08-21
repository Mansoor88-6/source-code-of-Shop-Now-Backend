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
const config_1 = require("../config/config");
const mongoose_1 = __importDefault(require("mongoose"));
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("Connecting to MongoDB...");
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            yield mongoose_1.default.connect(config_1.mongoDbUrl, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            const db = mongoose_1.default.connection;
            db.on("connected", () => {
                console.log("MongoDB is connected");
            });
            db.on("error", (error) => {
                console.error("MongoDB connection error:", error);
            });
            db.on("disconnected", () => {
                console.log("MongoDB connection disconnected");
            });
            db.on("reconnected", () => {
                console.log("MongoDB reconnected");
            });
        }
        catch (error) {
            console.error("Error connecting to MongoDB:", error);
        }
    });
}
run();
