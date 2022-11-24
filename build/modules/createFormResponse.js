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
const promises_1 = require("fs/promises");
const createFormResponse = (selectedImageName, width, height) => __awaiter(void 0, void 0, void 0, function* () {
    const imagesNames = yield (0, promises_1.readdir)('public/images');
    let selectOptions = '';
    for (const image of imagesNames) {
        const [imageName] = image.split('.');
        if (image === selectedImageName) {
            selectOptions += `\n <option value="${image}" selected>${imageName}</option>`;
        }
        else {
            selectOptions += `\n <option value="${image}">${imageName}</option>`;
        }
    }
    return `
        <h2 style="text-align:center;">Image resize API</h2>
        <form method="get" action="/resize" style="text-align:center;display: flex; flex-direction: column; gap: 15px; align-items: center;">
          <div style="display: flex; flex-direction: column; gap: 20px; align-items: center;">
            <label for="imageName">Choose an Image:</label>
            <select id="imageName" name="imageName">${selectOptions}</select> 
          </div>
          <div>
            <h3>Image resolution</h3>
            <label>Width</label>
            <input type="number" placeholder="width" name="width" value="${width || 0}">
            <label>height</label>
            <input type="number" placeholder="height" name="height" value="${height || 0}">
          </div>
          <input type="submit" value="Resize">
        </form>`;
});
exports.default = createFormResponse;
