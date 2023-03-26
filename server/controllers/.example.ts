import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client'

const app = Router();
const prisma = new PrismaClient();

app.get('/category', async (req: Request, res: Response) => {
  const categories = await prisma.category.findMany();
  res.send(categories);
});

app.post('/category', async (req:Request, res:Response) => {
  const category = await prisma.category.create({
    data: {
      name: req.body.name
    }
  });
  res.json({
    message:'sucessfully created', data: category
  })
});

app.put('/category/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const updated = await prisma.category.update({
    data: {
      name: req.body.name
    },
    where: {
      id: id
    }
  });
  res.json({
    message:'successfully updated', data: updated
  });
});

app.get('/category/:id', async (req: Request, res:Response) => {
  const id = parseInt(req.params.id);
  const category = await prisma.category.findUnique({
    where: {
      id: id
    }
  });
  res.json(category);
});

app.delete('/category/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const deleted = await prisma.category.delete({
    where: { id: id }
  });
  res.json({
    message:'succesfully deleted', data: deleted
  });
});

module.exports = app;