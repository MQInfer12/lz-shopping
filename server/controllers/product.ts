import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const app = Router();
const prisma = new PrismaClient();

app.get("/index", async (req: Request, res: Response) => {
  const products = await prisma.product.findMany({
    include: {
      categories: true,
      clients: true,
    },
    orderBy: {
      added: "desc",
    },
  });
  const categories = await prisma.category.findMany();
  res.json({
    products,
    categories,
  });
});

app.get("/product", async (req: Request, res: Response) => {
  const products = await prisma.product.findMany({
    include: {
      categories: true,
    },
    orderBy: {
      added: "desc",
    },
  });
  res.json(products);
});

app.post("/product", async (req: Request, res: Response) => {
  const categories: number[] = req.body.categories;
  const product = await prisma.product.create({
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

  const newProduct = await prisma.product.findUnique({
    where: {
      id: product.id,
    },
    include: {
      categories: true,
      clients: true,
    },
  });

  res.json({ message: "created succesfully", data: newProduct });
});

app.put("/product/toggle/:id", async (req: Request, res: Response) => {
  const product = await prisma.product.findUnique({
    where: {
      id: parseInt(req.params.id),
    },
  });
  const updated = await prisma.product.update({
    where: {
      id: product?.id,
    },
    include: {
      categories: true,
      clients: true,
    },
    data: {
      stock: product?.stock === 0 ? 1 : 0,
    },
  });

  res.json({ message: "updated succesfully", data: updated });
});

app.put("/product/:id", async (req: Request, res: Response) => {
  const product = await prisma.product.findUnique({
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

  const categories: number[] = req.body.categories;
  const disconnectids = product?.categories.filter(
    (v, i) => !categories.includes(v.id)
  );
  const updated = await prisma.product.update({
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

  const newProduct = await prisma.product.findUnique({
    where: {
      id: updated.id,
    },
    include: {
      categories: true,
      clients: true,
    },
  });

  res.json({ message: "updated succesfully", data: newProduct });
});

app.delete("/product/:id", async (req: Request, res: Response) => {
  const deleted = await prisma.product.delete({
    where: {
      id: parseInt(req.params.id),
    },
  });
  res.json({ message: "deleted succesfully", data: deleted });
});

module.exports = app;
