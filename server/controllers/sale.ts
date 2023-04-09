import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client'

const app = Router();
const prisma = new PrismaClient();

app.post('/sale/reserve/:id', async (req: Request, res: Response) => {
  let user = null;
  if(req.body.ci) {
    user = await prisma.client.findUnique({
      where: {
        ci: Number(req.body.ci)
      }
    });
    if(!user) {
      user = await prisma.client.create({
        data: {
          ci: Number(req.body.ci)
        }
      });
    }
  }
  if(req.body.saleId) {
    const sale = await prisma.sale.delete({
      where: {
        id: Number(req.body.saleId)
      }
    });
    res.json({message: "reserve canceled succesfully", data: sale});
  } else {
    const sale = await prisma.sale.create({
      data: {
        product: {
          connect: {
            id: Number(req.params.id)
          }
        },
        reserved: true,
        client: user?.ci ? {
          connect: {
            ci: user.ci
          }
        } : undefined
      }
    });
    res.json({message: "reserved succesfully", data: sale});
  }
});

module.exports = app;