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
const promises_1 = require("fs/promises");
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const request = (0, supertest_1.default)(index_1.default);
describe('Endpoint Check', () => {
    describe('Check if endpoints work as expected', () => {
        it('Main endpoint responds to (get requests) ', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/');
            expect(response.status).toBe(200);
        }));
        it('Resize endpoint responds to (get requests)', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/resize');
            expect(response.status).toBe(200);
        }));
        it('Resize endpoint should respond with status code 200 when the correct query parameters are provided', () => __awaiter(void 0, void 0, void 0, function* () {
            const images = yield (0, promises_1.readdir)('./public/images/');
            const response = yield request.get(`/resize?imageName=${images[0]}&width=400&height=300`);
            expect(response.status).toBe(200);
        }));
    });
    describe('Check if errors are handled correctly in case of invalid input', () => {
        it('Should throw an error 404 when Page is not found', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get(`/wrongEndpoint`);
            expect(response.statusCode).toBe(404);
        }));
        it('Should throw an error 500 when unknown image name is inserted', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/resize?imageName="ksjdf"');
            expect(response.statusCode).toBe(500);
        }));
        it('Should throw an error 500 when dimensions === 0', () => __awaiter(void 0, void 0, void 0, function* () {
            const images = yield (0, promises_1.readdir)('./public/images/');
            const response = yield request.get(`/resize?imageName=${images[0]}&width=0&height=0`);
            expect(response.statusCode).toBe(500);
        }));
        it('Should throw an error 500 when dimensions < 0', () => __awaiter(void 0, void 0, void 0, function* () {
            const images = yield (0, promises_1.readdir)('./public/images/');
            const response = yield request.get(`/resize?imageName=${images[0]}&width=-3&height=4`);
            expect(response.statusCode).toBe(500);
        }));
    });
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const images = yield (0, promises_1.readdir)('./public/thumb');
        for (const image of images) {
            yield (0, promises_1.unlink)(`./public/thumb/${image}`);
        }
    }));
});
