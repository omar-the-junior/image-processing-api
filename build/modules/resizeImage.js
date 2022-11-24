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
const promises_1 = require("node:fs/promises");
const sharp_1 = __importDefault(require("sharp"));
const resizeImage = (imageName, width, height) => __awaiter(void 0, void 0, void 0, function* () {
    const [plainName] = String(imageName).split('.');
    const newImageName = `${plainName}${width}x${height}.jpg`;
    const publicFolders = yield (0, promises_1.readdir)('./public');
    if (!publicFolders.includes('thumb')) {
        yield (0, promises_1.mkdir)('./public/thumb');
    }
    const imageBuffer = yield (0, sharp_1.default)(`./public/images/${imageName}`)
        .resize(Number(width), Number(height))
        .jpeg()
        .toBuffer();
    yield (0, promises_1.writeFile)(`./public/thumb/${newImageName}`, imageBuffer);
    return `\n <div style="display:flex; justify-content: center; margin-top: 30px;"><img src="/thumb/${newImageName}"></div>`;
});
exports.default = resizeImage;
