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
const express_1 = require("express");
const client_1 = require("@prisma/client");
const app = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
app.post('/product/category/:idProduct', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //SELECTING THE CURRENT CATEGORIES
    const product = yield prisma.product.findUnique({
        where: {
            id: parseInt(req.params.idProduct)
        },
        select: {
            categories: {
                select: {
                    id: true
                }
            }
        },
    });
    //THE BODY CONTAINS THE SELECTED CATEGORIES
    const connectIds = req.body;
    //WE FILTER THE CURRENT CATEGORIES TO FIND THE OLD ONES
    const disconnectIds = product === null || product === void 0 ? void 0 : product.categories.filter(category => !connectIds.includes(category.id));
    //CONNECT THE SELECTED CATEGORIES AND DISCONNECT THE OLD ONES
    yield prisma.product.update({
        where: {
            id: parseInt(req.params.idProduct)
        },
        data: {
            categories: {
                connect: connectIds.map(id => ({ id })),
                disconnect: disconnectIds
            }
        }
    });
    res.json({ message: "relations created succesfully" });
}));
module.exports = app;
