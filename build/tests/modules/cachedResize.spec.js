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
const cachedResize_1 = __importDefault(require("../../modules/cachedResize"));
const resizeImage_1 = __importDefault(require("../../modules/resizeImage"));
describe('caching and resize modules Check', () => {
    const resize = (0, cachedResize_1.default)(resizeImage_1.default);
    it('Should return a function', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(typeof resize).toBe('function');
    }));
    it('Should return the desired value after correct Image input', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield resize('fjord.jpg', 200, 300)).toBe(`\n <div style="display:flex; justify-content: center; margin-top: 30px;"><img src="/thumb/fjord200x300.jpg"></div>`);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const images = yield (0, promises_1.readdir)('./public/thumb');
        for (const image of images) {
            yield (0, promises_1.unlink)(`./public/thumb/${image}`);
        }
    }));
});
