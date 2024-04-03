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
app.get("/index", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield prisma.product.findMany({
        include: {
            categories: true,
            clients: true,
        },
        orderBy: {
            added: "desc",
        },
    });
    const categories = yield prisma.category.findMany();
    res.json({
        products,
        categories,
    });
}));
app.get("/product", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield prisma.product.findMany({
        include: {
            categories: true,
        },
        orderBy: {
            added: "desc",
        },
    });
    res.json(products);
}));
app.post("/product", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categories = req.body.categories;
    const product = yield prisma.product.create({
        data: {
            name: req.body.name,
            price: Number(req.body.price),
            stock: Number(req.body.stock),
            photo: req.body.photo,
            discount: Number(req.body.discount) ? Number(req.body.discount) : null,
            size: req.body.size ? req.body.size : null,
            categories: {
                connect: categories.map((id) => ({ id })),
            },
        },
    });
    const newProduct = yield prisma.product.findUnique({
        where: {
            id: product.id,
        },
        include: {
            categories: true,
            clients: true,
        },
    });
    res.json({ message: "created succesfully", data: newProduct });
}));
app.put("/product/toggle/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield prisma.product.findUnique({
        where: {
            id: parseInt(req.params.id),
        },
    });
    const updated = yield prisma.product.update({
        where: {
            id: product === null || product === void 0 ? void 0 : product.id,
        },
        include: {
            categories: true,
            clients: true,
        },
        data: {
            stock: (product === null || product === void 0 ? void 0 : product.stock) === 0 ? 1 : 0,
        },
    });
    res.json({ message: "updated succesfully", data: updated });
}));
app.put("/product/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield prisma.product.findUnique({
        select: {
            categories: {
                select: {
                    id: true,
                },
            },
        },
        where: {
            id: parseInt(req.params.id),
        },
    });
    const categories = req.body.categories;
    const disconnectids = product === null || product === void 0 ? void 0 : product.categories.filter((v, i) => !categories.includes(v.id));
    const updated = yield prisma.product.update({
        data: {
            name: req.body.name,
            price: Number(req.body.price),
            stock: Number(req.body.stock),
            photo: req.body.photo || undefined,
            discount: Number(req.body.discount) ? Number(req.body.discount) : null,
            size: req.body.size ? req.body.size : null,
            categories: {
                connect: categories.map((id) => ({ id })),
                disconnect: disconnectids,
            },
        },
        where: {
            id: parseInt(req.params.id),
        },
    });
    const newProduct = yield prisma.product.findUnique({
        where: {
            id: updated.id,
        },
        include: {
            categories: true,
            clients: true,
        },
    });
    res.json({ message: "updated succesfully", data: newProduct });
}));
app.delete("/product/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deleted = yield prisma.product.delete({
        where: {
            id: parseInt(req.params.id),
        },
    });
    res.json({ message: "deleted succesfully", data: deleted });
}));
module.exports = app;
