"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const resize_1 = __importDefault(require("./routes/resize"));
const app = (0, express_1.default)();
const port = 3000;
app.get('/', (req, res) => {
    res.status(200).send(`
  <h1 style="text-align:center;">Welcome to the Image Processing API</h1>
  <p style="text-align:center;"><a href="/resize">Click Here</a> to head to the Image resize API</p>
  `);
});
app.use(express_1.default.static('public'));
app.use(resize_1.default);
app.use((req, res) => {
    res
        .status(404)
        .send('<h1 style="text-align: center;"><span style="color: red;">Error 404:</span> Page not found :\'(</h1>');
});
app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is running on port: ${port}`);
});
exports.default = app;
