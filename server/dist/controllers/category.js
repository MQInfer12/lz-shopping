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
app.get('/category', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield prisma.category.findMany();
    res.send(categories);
}));
app.post('/category', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const category = yield prisma.category.create({
        data: {
            name: req.body.name
        }
    });
    res.json({
        message: 'sucessfully created', data: category
    });
}));
app.put('/category/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const updated = yield prisma.category.update({
        data: {
            name: req.body.name
        },
        where: {
            id: id
        }
    });
    res.json({
        message: 'successfully updated', data: updated
    });
}));
app.get('/category/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const category = yield prisma.category.findUnique({
        where: {
            id: id
        }
    });
    res.json(category);
}));
app.delete('/category/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const deleted = yield prisma.category.delete({
        where: { id: id }
    });
    res.json({
        message: 'succesfully deleted', data: deleted
    });
}));
module.exports = app;
