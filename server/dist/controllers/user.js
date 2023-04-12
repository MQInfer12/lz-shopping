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
app.post('/user', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ci = Number(req.body.ci);
    let user = yield prisma.client.findUnique({
        where: { ci },
        include: {
            products: {
                include: {
                    product: true
                }
            }
        }
    });
    const products = user === null || user === void 0 ? void 0 : user.products.map(v => v.product);
    if (user)
        return res.json({ message: "logged succesfully", data: Object.assign(Object.assign({}, user), { bookings: products }) });
    const newUser = yield prisma.client.create({
        data: { ci }
    });
    res.json({ message: "created succesfully", data: Object.assign(Object.assign({}, newUser), { products: [] }) });
}));
app.put('/user/:ci', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const existingCi = yield prisma.client.findUnique({
        where: {
            ci: Number(req.body.ci)
        }
    });
    if (!existingCi) {
        const user = yield prisma.client.update({
            where: {
                ci: Number(req.params.ci)
            },
            data: {
                name: req.body.name,
                phone: Number(req.body.phone),
                ci: Number(req.body.ci)
            }
        });
        res.json({ message: "updated succesfully", data: user });
    }
    else {
        res.json({ message: "error", error: "Ya existe un usuario con este CI" });
    }
}));
module.exports = app;
