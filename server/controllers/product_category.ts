import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client'

const app = Router();
const prisma = new PrismaClient();

app.post('/product/category/:idProduct', async (req: Request, res: Response) => {
  //SELECTING THE CURRENT CATEGORIES
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

  //THE BODY CONTAINS THE SELECTED CATEGORIES
  const connectIds: number[] = req.body;
  //WE FILTER THE CURRENT CATEGORIES TO FIND THE OLD ONES
  const disconnectIds = product?.categories.filter(category => !connectIds.includes(category.id));

  //CONNECT THE SELECTED CATEGORIES AND DISCONNECT THE OLD ONES
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