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
app.post('/sale/reserve/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let user = null;
    if (req.body.ci) {
        user = yield prisma.client.findUnique({
            where: {
                ci: Number(req.body.ci)
            }
        });
        if (!user) {
            user = yield prisma.client.create({
                data: {
                    ci: Number(req.body.ci)
                }
            });
        }
    }
    if (req.body.saleId) {
        const sale = yield prisma.sale.delete({
            where: {
                id: Number(req.body.saleId)
            }
        });
        res.json({ message: "reserve canceled succesfully", data: sale });
    }
    else {
        const sale = yield prisma.sale.create({
            data: {
                product: {
                    connect: {
                        id: Number(req.params.id)
                    }
                },
                reserved: true,
                amount: Number(req.body.amount),
                client: (user === null || user === void 0 ? void 0 : user.ci) ? {
                    connect: {
                        ci: user.ci
                    }
                } : undefined
            }
        });
        res.json({ message: "reserved succesfully", data: sale });
    }
}));
module.exports = app;
