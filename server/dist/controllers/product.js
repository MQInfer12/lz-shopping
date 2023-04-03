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
app.get('/index', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield prisma.product.findMany({
        include: {
            categories: true,
            clients: true
        },
        orderBy: {
            id: "asc"
        }
    });
    const categories = yield prisma.category.findMany();
    res.json({
        products,
        categories
    });
}));
app.get('/product', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield prisma.product.findMany({
        include: {
            categories: true
        }
    });
    res.json(products);
}));
app.post('/product', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield prisma.product.create({
        data: {
            name: req.body.name,
            price: req.body.price,
            stock: req.body.stock,
            photo: req.body.photo,
            discount: req.body.discount ? req.body.discount : null,
            size: req.body.size ? req.body.size : null
        }
    });
    res.json({ message: 'created succesfully', data: product });
}));
app.put('/product/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updated = yield prisma.product.update({
        data: {
            name: req.body.name,
            price: req.body.price,
            stock: req.body.stock,
            photo: req.body.photo,
            discount: req.body.discount ? req.body.discount : null,
            size: req.body.size ? req.body.size : null
        },
        where: {
            id: parseInt(req.params.id)
        }
    });
    res.json({ message: 'updated succesfully', data: updated });
}));
app.delete('/product/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deleted = yield prisma.product.delete({
        where: {
            id: parseInt(req.params.id)
        }
    });
    res.json({ message: 'deleted succesfully', data: deleted });
}));
module.exports = app;
