"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
var cors = require('cors');
const category = require('./controllers/category');
const product = require('./controllers/product');
const product_category = require('./controllers/product_category');
const user = require('./controllers/user');
const sale = require('./controllers/sale');
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(category);
app.use(product);
app.use(product_category);
app.use(user);
app.use(sale);
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
