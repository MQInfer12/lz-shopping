import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client'

const app = Router();
const prisma = new PrismaClient();

app.post('/product/category/:idProduct', async (req: Request, res: Response) => {
  const product = await prisma.product.findUnique({
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

  const connectIds: number[] = req.body;
  const disconnectIds = product?.categories.filter(category => !connectIds.includes(category.id));

  await prisma.product.update({
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
});

module.exports = app;