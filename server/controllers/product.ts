import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client'

const app = Router();
const prisma = new PrismaClient();

app.get('/index', async (req: Request, res: Response) => {
  const products = await prisma.product.findMany({
    include: {
      categories: true
    },
    orderBy: {
      id: "asc"
    }
  });
  const categories = await prisma.category.findMany();
  res.json({
    products,
    categories
  });
});

app.get('/product', async (req: Request, res: Response) => {
  const products = await prisma.product.findMany({
    include: {
      categories: true
    }
  });
  res.json(products);
});

app.post('/product', async (req: Request, res: Response) => {
  const product = await prisma.product.create({
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
});

app.put('/product/:id', async (req: Request, res: Response) => {
  const updated = await prisma.product.update({
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
});

app.delete('/product/:id', async (req: Request, res: Response) => {
  const deleted = await prisma.product.delete({
    where: {
      id: parseInt(req.params.id)
    }
  });
  res.json({ message: 'deleted succesfully', data: deleted });
});

module.exports = app;