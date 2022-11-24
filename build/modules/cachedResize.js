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
Object.defineProperty(exports, "__esModule", { value: true });
const cachedResize = (f) => {
    const cache = {};
    return (imageName, width, height) => __awaiter(void 0, void 0, void 0, function* () {
        const [plainName] = imageName.split('.');
        const resizedImageName = `${plainName}${width}x${height}.jpg`;
        let status = '\n <h2 style="text-align:center;">Your Image was already resized. Here is the saved thumbnail 😄</h2>';
        if (!Object.keys(cache).includes(resizedImageName)) {
            status = '';
            cache[resizedImageName] = yield f(imageName, width, height);
        }
        // console.log(status);
        // console.log(
        //   '-------------------------------------- cache ------------------------------------'
        // );
        // console.table(cache);
        return status + cache[resizedImageName];
    });
};
exports.default = cachedResize;
