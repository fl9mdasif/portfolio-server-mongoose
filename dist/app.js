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
/* eslint-disable @typescript-eslint/no-explicit-any */
// import 'dotenv/config';
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const notFound_1 = __importDefault(require("./app/middlewares/notFound"));
const routes_1 = __importDefault(require("./app/routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// import { ImageUploads } from './app/modules/upload/route.upload';
const app = (0, express_1.default)();
// parser middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const allowedOrigins = [
    'https://dev-mdasif-portolio.vercel.app',
    'https://master.d1nc0rwrl0o6av.amplifyapp.com', // Your Amplify frontend
    'http://localhost:3000'
];
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps, Postman)
        if (!origin)
            return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
}));
app.use((0, cookie_parser_1.default)());
// application routes
app.use('/api/v1', routes_1.default);
// app.use('/api/v1/upload', ImageUploads);
app.get('/', (req, res) => {
    res.send('portfolio-server-mongoose is running....');
});
const test = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const a = 10;
    res.send(a);
});
app.get('/a', test);
// not found middleware with http-status
app.use(notFound_1.default);
// global err handler middleware. must declare it in the last off the file
app.use(globalErrorHandler_1.default);
exports.default = app;
